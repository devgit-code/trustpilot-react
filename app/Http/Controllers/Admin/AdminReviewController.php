<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
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
        return Inertia::render('Admin/Review/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|max:255"
        ]);

        $creationData = [
            "name" => $request->input('name'),
            "description" => $request->input('description'),
            "business_id" => auth('business')->user()->id,
        ];

        Product::create($creationData);

        return redirect()->route('business.products.index');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $review = Review::with(['user', 'user.profile', 'reply', 'business', 'business.profile'])->findOrFail($id);
        $userTotalReviews = Review::where('user_id', $review->user_id)->count();

        return Inertia::render('Admin/Review/Show', [
            'review' => $review,
            'userTotalReviews' => $userTotalReviews, // Pass total count to the frontend
        ]);
    }


    public function edit(string $id)
    {
        //
    }


    public function update(Request $request, string $id)
    {
        $request->validate([
            "name" => "required|max:255"
        ]);

        $product = Product::findOrFail($id);

        $updateData = [
            "name" => $request->input('name'),
            "description" => $request->input('description'),
        ];

        $product->update($updateData);
        return redirect()->route('business.products.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('business.products.index')->with('success', 'Role deleted successfully.');
    }
}
