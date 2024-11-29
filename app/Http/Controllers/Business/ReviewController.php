<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reviews = Review::all();
        return Inertia::render('Business/Review/Index', compact('reviews'));
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
        $review = Review::find($id);
        return Inertia::render('Business/Review/Edit', compact('review'));
    }


    public function update(Request $request, string $id)
    {
        $request->validate([
            "name" => "required|max:255"
        ]);

        $review = Review::findOrFail($id);

        $updateData = [
            "name" => $request->input('name'),
        ];

        $review->update($updateData);
        return redirect()->route('business.reviews.index');
    }

    public function destroy(Review $review)
    {
        $review->delete();
        return redirect()->route('business.reviews.index')->with('success', 'Role deleted successfully.');
    }
}
