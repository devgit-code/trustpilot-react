<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Review;
use App\Models\Business;
use App\Models\Category;
use App\Models\SubCategory;
use Inertia\Inertia;
use NumberFormatter;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('subcategories')->get();

        return Inertia::render('Category/Index', [
            'categories' => $categories,
        ]);
    }


    public function apiSearchCategory(Request $request)
    {
        $searchTerm = $request->input('query', '');

        $categories = Category::where('name', 'like', '%' . $searchTerm . '%')
            ->select('id', 'name', DB::raw('1 as is_category')); // Add is_category = 1 for categories

        $sub_categories = SubCategory::where('name', 'like', '%' . $searchTerm . '%')
            ->select('id', 'name', DB::raw('0 as is_category')); // Add is_category = 1 for categories

        $results = $categories->union($sub_categories)
            ->orderBy('name', 'asc') // Optional: Sort alphabetically
            ->limit(5)
            ->get();

        return response()->json([
            'categories' => $results,
        ]);
    }

    public function show(Request $request, String $category_id)
    {
        $category = Category::find($category_id);
        $subCategories = Category::with(['subcategories' => function ($query){
            $query->withCount('businesses');
        }])->findOrFail($category_id);

        $subCategory_ids = $subCategories->subcategories->pluck('id')->toArray();
        $businesses = Business::with(['profile', 'trustscore', 'count_reviews'])->whereHas('businessCategories', function ($query) use ($subCategory_ids) {
            $query->whereIn('sub_category_id', $subCategory_ids);
        })->paginate(10); // Paginate the results

        return Inertia::render('Category/Detail', [
            'data' => [
                'category' => $category,
                'related_categoreies' => $subCategories->subcategories,
                'companies' => $businesses,
            ]
        ]);
    }

    public function detail(Request $request, String $sub_category_id)
    {
        $subCategory = SubCategory::with(['category'])->find($sub_category_id);

        $subCategories = Category::with(['subcategories' => function ($query){
            $query->withCount('businesses');
        }])->findOrFail($subCategory->category_id);

        $paginate = Business::query()->with(['profile'])->whereHas('businessCategories', function ($query) use ($sub_category_id) {
            $query->where('sub_category_id', $sub_category_id);
        })->paginate(10); // Paginate the results

        $businesses = collect($paginate->items())->map(function ($business, $index) {
            $business['trustscore'] = number_format($business->reviews->avg('rating'), 1);
            $business['reviews_count'] = count($business->reviews);
            return $business;
        });


        $reviews = Review::with('reply')->latest()->take(3)->get();
        $reviews = $reviews->map(function ($review, $index) {
            $review['user'] = [
                'name'=>$review->user->name,
                'avatar'=>$review->user->profile?->image,
            ];
            $review['company'] = [
                'id'=>$review->business->id,
                'name'=>$review->business->company_name,
                'website'=>$review->business->website,
                'logo'=>$review->business->profile?->logo,
                'trustscore'=>number_format($review->business->reviews->avg('rating'), 1),
                'count_reviews'=>count($review->business->reviews),
            ];
            return $review;
        });

        return Inertia::render('Category/Detail', [
            'data' => [
                'sub_category' => $subCategory,
                'related_categoreies' => $subCategories->subcategories,
                'companies' => $businesses,
                'pagination' => [
                    'current_page' => $paginate->currentPage(),
                    'last_page' => $paginate->lastPage(),
                    'per_page' => $paginate->perPage(),
                    'total' => $paginate->total(),
                    'links' => [
                        'first' => $paginate->url(1),
                        'last' => $paginate->url($paginate->lastPage()),
                        'next' => $paginate->nextPageUrl(),
                        'prev' => $paginate->previousPageUrl(),
                    ],
                ],
                'recent_reviews' => $reviews
            ]
        ]);
    }

    public function update(Request $request)
    {

    }
}
