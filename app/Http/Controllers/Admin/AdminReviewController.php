<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\ReviewThumb;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $reviews = Review::all();
        return Inertia::render('Admin/Review/Index');
    }

    public function apiIndex(Request $request)
    {
        $page = $request->input('page', 1); // Default to page 1
        $sortOrder = $request->input('sort_by_date', 'desc');
        $rating = $request->input('rating');
        $searchTerm = $request->input('search');

        $query = Review::query()->with(['business', 'user']);

        if ($rating) {
            $query->where('rating', $rating);
        }

        if($searchTerm){
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                    ->orWhereHas('user', function ($userQuery) use ($searchTerm) {
                        $userQuery->where('name', 'like', "%{$searchTerm}%");
                    })
                    ->orWhereHas('business', function ($businessQuery) use ($searchTerm) {
                        $businessQuery->where('company_name', 'like', "%{$searchTerm}%");
                    });
            });
        }

        $query->orderBy('date_experience', $sortOrder);

        // Paginate the results
        $data = $query->paginate(10, ['*'], 'page', $page);

        $reviews = collect($data->items())->map(function($review, $index) {
            $review['flag'] = ReviewThumb::where('review_id', $review->id)->where('thumb', false)->count();
            $review['useful'] = ReviewThumb::where('review_id', $review->id)->where('thumb', true)->count();
            return $review;
        });

        return response()->json([
            'reviews' => $reviews,
            'filters' => $request->only('sort_by_date', 'rating'),
            'pagination' => [
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'per_page' => $data->perPage(),
                'total' => $data->total(),
                'links' => [
                    'first' => $data->url(1),
                    'last' => $data->url($data->lastPage()),
                    'next' => $data->nextPageUrl(),
                    'prev' => $data->previousPageUrl(),
                ],
            ],
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Review/Create');
    }

    public function store(Request $request)
    {

    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $review = Review::with(['user', 'user.profile', 'reply', 'business', 'business.profile'])->findOrFail($id);
        $userTotalReviews = Review::where('user_id', $review->user_id)->count();

        $review['flag'] = ReviewThumb::where('review_id', $review->id)->where('thumb', false)->count();
        $review['useful'] = ReviewThumb::where('review_id', $review->id)->where('thumb', true)->count();

        return Inertia::render('Admin/Review/Show', [
            'review' => $review,
            'userTotalReviews' => $userTotalReviews, // Pass total count to the frontend
            'count_reviews' => count($review->business->reviews),
            'trustscore' => number_format($review->business->reviews->avg('rating'), 1),
        ]);
    }


    public function edit(string $id)
    {
        //
    }


    public function update(Request $request, string $id)
    {

    }

    public function destroy(Review $review)
    {
        $review->delete();
        return redirect()->route('admin.reviews.index')->with('success', 'Review deleted successfully.');
    }
}
