<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Review;
use App\Models\Category;
use App\Models\SubCategory;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('subcategories')->get();

        return Inertia::render('Category/Index', [
            'categories' => $categories,
        ]);
    }

    public function search()
    {
        return Inertia::render('Category/Search');
    }

    public function show(Request $request, String $category_id)
    {
        $category = Category::find($category_id);
        $subCategories = Category::with(['subcategories' => function ($query){
            $query->withCount('businesses');
        }])->findOrFail($category_id);

        $category1 = Category::with(['subCategories.businesses.reviews' => function ($query) {
            // Get the latest 5 reviews for businesses
            $query->latest()->limit(5);
        }])->findOrFail($category_id);

        $latestReviews = [];
        foreach ($category1->subCategories as $subCategory) {
            // Loop through each business in the subcategory
            foreach ($subCategory->businesses as $business) {
                // Loop through the reviews of the business
                foreach ($business->reviews as $review) {
                    // Add the review with business info
                    $latestReviews[] = [
                        'business_name' => $business->name,
                        'review_content' => $review->content,
                        'created_at' => $review->created_at,
                        'rating' => $review->rating,
                        'business_logo' => $business->logo ?? 'default_logo.jpg', // Example logo
                    ];
                }
            }
        }
        // $reviews = Review::whereIn('sub_category_id', function ($query) use ($category_id) {
        //     $query->select('id')
        //         ->from('sub_categories')
        //         ->where('category_id', $category_id);
        // })
        // ->latest() // Order by created_at in descending order
        // ->take(5)  // Limit the results to 5
        // ->get();

        return Inertia::render('Category/Detail', [
            'data' => [
                'category' => $category,
                'related_categoreies' => $subCategories->subcategories,
            ]
        ]);
    }

    public function detail(Request $request, String $sub_category_id)
    {
        $subCategory = SubCategory::with(['category'])->find($sub_category_id);

        $subCategories = Category::with(['subcategories' => function ($query){
            $query->withCount('businesses');
        }])->findOrFail($subCategory->category_id);

// dd($subCategory->category->name);
        $reviews = Review::whereIn('business_id', function ($query) use ($sub_category_id) {
                $query->select('id') // Get business IDs
                    ->from('business_categories')
                    ->where('sub_category_id', $sub_category_id);
            })
            ->latest() // Order reviews by created_at in descending order
            ->take(5)  // Limit the results to the latest 5
            ->get();

        return Inertia::render('Category/Detail', [
            'data' => [
                'sub_category' => $subCategory,
                'related_categoreies' => $subCategories->subcategories,
            ]
        ]);
    }

    public function update(Request $request)
    {

    }
}
