<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\Reply;
use App\Models\Review;
use App\Models\ReviewThumb;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Business/Review/Index', []);
    }

    public function apiIndex(Request $request)
    {
        $business = Auth::guard('business')->user();

        $page = $request->input('page', 1); // Default to page 1
        $sortOrder = $request->input('sort_by_date', 'desc');
        $rating = $request->input('rating');
        $searchTerm = $request->input('search');

        $query = Review::query()->where('business_id', $business->id)->with(['user', 'business']);

        if ($rating) {
            $query->where('rating', $rating);
        }

        if($searchTerm){
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                    ->orWhereHas('user', function ($userQuery) use ($searchTerm) {
                        $userQuery->where('name', 'like', "%{$searchTerm}%");
                    });
                    // ->orWhereHas('business', function ($businessQuery) use ($searchTerm) {
                    //     $businessQuery->where('name', 'like', "%{$searchTerm}%");
                    // });
            });
        }

        $query->orderBy('date_experience', $sortOrder);

        // Paginate the results
        $reviews = $query->paginate(10, ['*'], 'page', $page);

        return response()->json([
            'reviews' => $reviews->items(),
            'filters' => $request->only('sort_by_date', 'rating'),
            'pagination' => [
                'current_page' => $reviews->currentPage(),
                'last_page' => $reviews->lastPage(),
                'per_page' => $reviews->perPage(),
                'total' => $reviews->total(),
                'links' => [
                    'first' => $reviews->url(1),
                    'last' => $reviews->url($reviews->lastPage()),
                    'next' => $reviews->nextPageUrl(),
                    'prev' => $reviews->previousPageUrl(),
                ],
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Business/Review/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            "title" => "required|max:255"
        ]);

        $creationData = [
            "title" => $request->input('title'),
            "description" => $request->input('title'),
            "business_id" => auth('business')->user()->id,
            "user_id" => 1,
            "rating" => 1,
        ];

        Review::create($creationData);

        return redirect()->route('business.reviews.index');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }


    public function edit(string $id)
    {
        $review = Review::with(['user', 'user.profile', 'reply'])->findOrFail($id);

        $userTotalReviews = Review::where('user_id', $review->user_id)->count();
        $useful = ReviewThumb::where('review_id', $review->id)->where('thumb', true)->count();
        $flag = ReviewThumb::where('review_id', $review->id)->where('thumb', false)->count();

        return Inertia::render('Business/Review/Edit', [
            'review' => $review,
            'userTotalReviews' => $userTotalReviews, // Pass total count to the frontend
            'useful' => $useful, // Pass total count to the frontend
            'flag' => $flag, // Pass total count to the frontend
        ])->with('status', session('status'));
    }


    public function update(Request $request, string $id)
    {
        $request->validate([
            "reply" => "required"
        ]);

        $reply = Reply::where('review_id', $id)->first();

        if (!$reply) {
            $reply = new Reply();
            $reply->review_id = $id;
        }

        $reply['comment'] = $request->input('reply');
        $reply->save();

        return redirect()->route('business.reviews.edit', $id)->with('status', 'Update reply successfully');
    }

    public function destroy(Review $review)
    {
        $review->delete();
        return redirect()->route('business.reviews.index')->with('success', 'Role deleted successfully.');
    }
}
