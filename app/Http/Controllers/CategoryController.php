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
        $categories = Category::with('subcategories', 'subcategories.category')->get();

        return Inertia::render('Category/Index', [
            'categories' => $categories,
        ]);
    }


    public function apiSearchCategory(Request $request)
    {
        $searchTerm = $request->input('query', '');

        $categories = Category::where('name', 'like', '%' . $searchTerm . '%')
            ->select(
                'id',
                'name',
                'slug',
                DB::raw('1 as is_category'),
                DB::raw('NULL as parent_category')
            ); // Add is_category = 1 for categories

        $sub_categories = SubCategory::where('sub_categories.name', 'like', '%' . $searchTerm . '%')
            ->join('categories', 'sub_categories.category_id', '=', 'categories.id')
            ->select(
                'sub_categories.id',
                'sub_categories.name',
                'sub_categories.slug',
                DB::raw('0 as is_category'),
                DB::raw('JSON_OBJECT("id", categories.id, "name", categories.name, "slug", categories.slug, "image", categories.image) as parent_category')
            ); // Add is_category = 1 for categories

        $results = $categories->union($sub_categories)
            ->orderBy('name', 'asc') // Optional: Sort alphabetically
            ->limit(5)
            ->get();

        $results->transform(function ($item) {
            if (isset($item->parent_category)) {
                $item->parent_category = json_decode($item->parent_category, true); // Convert to an array
            }
            return $item;
        });

        return response()->json([
            'categories' => $results,
        ]);
    }

    public function show(Request $request, String $category_name)
    {
        $category = Category::where('slug', $category_name)->first();

        $subCategories = Category::with(['subcategories' => function ($query){
            $query->withCount('businesses');
        }])->findOrFail($category->id);

        $subCategory_ids = $subCategories->subcategories->pluck('id')->toArray();
        $businesses = Business::with(['profile'])->whereHas('businessCategories', function ($query) use ($subCategory_ids) {
            $query->whereIn('sub_category_id', $subCategory_ids);
        })->get(); // Paginate the results

        $businesses = $businesses->map(function ($business, $index) {
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
                'category' => $category,
                'related_categoreies' => $subCategories->subcategories,
                'companies' => $businesses,
                // 'pagination' => [
                //     'current_page' => $paginate->currentPage(),
                //     'last_page' => $paginate->lastPage(),
                //     'per_page' => $paginate->perPage(),
                //     'total' => $paginate->total(),
                //     'links' => [
                //         'first' => $paginate->url(1),
                //         'last' => $paginate->url($paginate->lastPage()),
                //         'next' => $paginate->nextPageUrl(),
                //         'prev' => $paginate->previousPageUrl(),
                //     ],
                // ],
                'recent_reviews' => $reviews
            ]
        ]);
    }

    public function detail(Request $request, String $category, String $sub_category)
    {
        $category = Category::where('slug', $category)->first();
        $subCategory = SubCategory::with(['category'])->where('category_id', $category->id)->where('slug', $sub_category)->first();

        $subCategories = Category::with(['subcategories' => function ($query){
            $query->withCount('businesses');
        }])->findOrFail($subCategory->category_id);

        $businesses = Business::with(['profile'])->whereHas('businessCategories', function ($query) use ($subCategory) {
            $query->where('sub_category_id', $subCategory->id);
        })->get(); // Paginate the results

        $businesses = $businesses->map(function ($business, $index) {
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
                // 'pagination' => [
                //     'current_page' => $paginate->currentPage(),
                //     'last_page' => $paginate->lastPage(),
                //     'per_page' => $paginate->perPage(),
                //     'total' => $paginate->total(),
                //     'links' => [
                //         'first' => $paginate->url(1),
                //         'last' => $paginate->url($paginate->lastPage()),
                //         'next' => $paginate->nextPageUrl(),
                //         'prev' => $paginate->previousPageUrl(),
                //     ],
                // ],
                'recent_reviews' => $reviews
            ]
        ]);
    }

    public function update(Request $request)
    {

    }
}
