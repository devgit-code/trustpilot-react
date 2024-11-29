<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\Reply;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sortOrder = $request->input('sort_by_date', 'desc');
        $rating = $request->input('rating');

        $query  = Review::query()->with(['user']);

        if ($rating) {
            $query->where('rating', $rating);
        }
        $query->orderBy('date_experience', $sortOrder);

        return Inertia::render('Business/Review/Index', [
            'reviews' => $query->paginate(10),
            'filters' => $request->only('sort_by_date', 'rating'),
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

        return Inertia::render('Business/Review/Edit', [
            'review' => $review,
            'userTotalReviews' => $userTotalReviews, // Pass total count to the frontend
        ]);
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

        return redirect()->route('business.reviews.edit', $id);
    }

    public function destroy(Review $review)
    {
        $review->delete();
        return redirect()->route('business.reviews.index')->with('success', 'Role deleted successfully.');
    }
}
