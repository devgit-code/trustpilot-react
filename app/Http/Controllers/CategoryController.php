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
            $query->with('category');
        }])->findOrFail($category->id);

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

        $page = $request->input('page', 1); // Default to page 1
        $sortBy = $request->input('sort', 'trustscore'); // Default to page 1
        $score = $request->input('score', 'any'); // Default to page 1
        $isVerified = $request->input('verified', false); // Default to page 1
        $isClaimed = $request->input('claimed', false); // Default to page 1

        $query = DB::table('businesses')
            ->select(
                'businesses.id',
                'businesses.website',
                'businesses.company_name',
                'businesses.company_email',
                'businesses.email_verified_at',
                'business_profiles.logo as logo',
                'business_profiles.email as profile_email',
                'business_profiles.phone as profile_phone',
                'business_profiles.country as profile_country',
                'business_profiles.city as profile_city',
                DB::raw('COALESCE(AVG(reviews.rating), 0) AS avg_rating'),
                DB::raw('COUNT(reviews.id) AS count_reviews'),
                DB::raw('MAX(reviews.created_at) AS latest_review_timestamp'),
                DB::raw('GROUP_CONCAT(DISTINCT sub_categories.name ORDER BY sub_categories.name ASC) AS categories') // Get category names
            )
            // Only join business_categories if sub_category_id is used
            ->leftJoin('business_categories', 'business_categories.business_id', '=', 'businesses.id')
            // Join reviews for the average rating
            ->leftJoin('sub_categories', 'sub_categories.id', '=', 'business_categories.sub_category_id') // Join categories table to fetch category names
            ->leftJoin('reviews', 'reviews.business_id', '=', 'businesses.id')
            ->leftJoin('business_profiles', 'business_profiles.business_id', '=', 'businesses.id')
            ->groupBy(
                'businesses.id',
                'businesses.website',
                'businesses.company_name',
                'businesses.company_email',
                'businesses.email_verified_at',
                'business_profiles.logo',
                'business_profiles.email',
                'business_profiles.phone',
                'business_profiles.country',
                'business_profiles.city',
            );

        $subCategory_ids = $subCategories->subcategories->pluck('id')->toArray();
        if (!empty($subCategory_ids)) {
            $query->whereIn('business_categories.sub_category_id', $subCategory_ids);
        }

        if ($score === '3.0') {
            $query->havingRaw('AVG(reviews.rating) >= 3');
        } elseif ($score === '4.0') {
            $query->havingRaw('AVG(reviews.rating) >= 4');
        } elseif ($score === '4.5') {
            $query->havingRaw('AVG(reviews.rating) >= 4.5');
        }

        // 3) Sorting
        if ($sortBy === 'trustscore') {
            // Sort by the computed average rating, desc
            $query->orderByDesc(DB::raw('AVG(reviews.rating)'));
        } elseif ($sortBy === 'highest') {
            // Sort by business creation date, desc
            $query->orderByDesc(DB::raw('COUNT(reviews.id)'));
        } elseif ($sortBy === 'latest') {
            // Sort by the latest review timestamp, desc
            $query->orderByDesc(DB::raw('MAX(reviews.created_at)'));
        }

        if($isVerified){
            $query->whereNotNull('businesses.email_verified_at');
        }

        if($isClaimed){
            $query->whereNotNull('businesses.company_email');
        }

        $businesses = $query->paginate(10, ['*'], 'page', $page);

        // $maps = collect($businesses->items())->map(function ($business, $index) {
        //     $business['categories'] = $business->businessCategories;
        //     return $business;
        // });

        return Inertia::render('Category/Detail', [
            'data' => [
                'category' => $category,
                'related_categoreies' => $subCategories->subcategories,
                'recent_reviews' => $reviews,
                'companies' => collect($businesses->items()),
                'pagination' => [
                    'current_page' => $businesses->currentPage(),
                    'last_page' => $businesses->lastPage(),
                    'per_page' => $businesses->perPage(),
                    'total' => $businesses->total(),
                    'links' => [
                        'first' => $businesses->url(1),
                        'last' => $businesses->url($businesses->lastPage()),
                        'next' => $businesses->nextPageUrl(),
                        'prev' => $businesses->previousPageUrl(),
                    ],
                ],
            ]
        ]);
    }

    public function detail(Request $request, String $category, String $sub_category)
    {
        $category = Category::where('slug', $category)->first();
        $subCategory = SubCategory::with(['category'])->where('category_id', $category->id)->where('slug', $sub_category)->first();

        $subCategories = Category::with(['subcategories' => function ($query){
            $query->withCount('businesses');
            $query->with('category');
        }])->findOrFail($subCategory->category_id);

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

        $page = $request->input('page', 1); // Default to page 1
        $sortBy = $request->input('sort', 'trustscore'); // Default to page 1
        $score = $request->input('score', 'any'); // Default to page 1
        $isVerified = $request->input('verified', false); // Default to page 1
        $isClaimed = $request->input('claimed', false); // Default to page 1

        $query = DB::table('businesses')
            ->select(
                'businesses.id',
                'businesses.website',
                'businesses.company_name',
                'businesses.company_email',
                'businesses.email_verified_at',
                'business_profiles.logo as logo',
                'business_profiles.email as profile_email',
                'business_profiles.phone as profile_phone',
                'business_profiles.country as profile_country',
                'business_profiles.city as profile_location',
                DB::raw('COALESCE(AVG(reviews.rating), 0) AS avg_rating'),
                DB::raw('COUNT(reviews.id) AS count_reviews'),
                DB::raw('MAX(reviews.created_at) AS latest_review_timestamp'),
                DB::raw('GROUP_CONCAT(DISTINCT sub_categories.name ORDER BY sub_categories.name ASC) AS categories') // Get category names
            )
            ->leftJoin('business_categories', 'business_categories.business_id', '=', 'businesses.id')
            ->leftJoin('sub_categories', 'sub_categories.id', '=', 'business_categories.sub_category_id') // Join categories table to fetch category names
            ->leftJoin('reviews', 'reviews.business_id', '=', 'businesses.id')
            ->leftJoin('business_profiles', 'business_profiles.business_id', '=', 'businesses.id')
            ->groupBy(
                'businesses.id',
                'businesses.website',
                'businesses.company_name',
                'businesses.company_email',
                'businesses.email_verified_at',
                'business_profiles.logo',
                'business_profiles.email',
                'business_profiles.phone',
                'business_profiles.country',
                'business_profiles.city',
            );

        $query->where('business_categories.sub_category_id', $subCategory->id);

        if ($score === '3.0') {
            $query->havingRaw('AVG(reviews.rating) >= 3');
        } elseif ($score === '4.0') {
            $query->havingRaw('AVG(reviews.rating) >= 4');
        } elseif ($score === '4.5') {
            $query->havingRaw('AVG(reviews.rating) >= 4.5');
        }

        // 3) Sorting
        if ($sortBy === 'trustscore') {
            // Sort by the computed average rating, desc
            $query->orderByDesc(DB::raw('AVG(reviews.rating)'));
        } elseif ($sortBy === 'highest') {
            // Sort by business creation date, desc
            $query->orderByDesc(DB::raw('COUNT(reviews.id)'));
        } elseif ($sortBy === 'latest') {
            // Sort by the latest review timestamp, desc
            $query->orderByDesc(DB::raw('MAX(reviews.created_at)'));
        }

        if($isVerified){
            $query->whereNotNull('businesses.email_verified_at');
        }

        if($isClaimed){
            $query->whereNotNull('businesses.company_email');
        }

        $businesses = $query->paginate(10, ['*'], 'page', $page);

        return Inertia::render('Category/Detail', [
            'data' => [
                'sub_category' => $subCategory,
                'related_categoreies' => $subCategories->subcategories,
                'recent_reviews' => $reviews,
                'companies' => collect($businesses->items()),
                'pagination' => [
                    'current_page' => $businesses->currentPage(),
                    'last_page' => $businesses->lastPage(),
                    'per_page' => $businesses->perPage(),
                    'total' => $businesses->total(),
                    'links' => [
                        'first' => $businesses->url(1),
                        'last' => $businesses->url($businesses->lastPage()),
                        'next' => $businesses->nextPageUrl(),
                        'prev' => $businesses->previousPageUrl(),
                    ],
                ],
            ]
        ]);
    }

    public function update(Request $request)
    {

    }
}
