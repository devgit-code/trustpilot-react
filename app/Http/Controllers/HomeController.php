<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Business;
use App\Models\Review;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $categories = SubCategory::all();

        $businesses = Business::latest()->take(4)->get();
        $businesses = $businesses->map(function ($business, $index) {
            $business['logo'] = $business->profile?->logo;
            $business['trustscore'] = number_format($business->reviews->avg('rating'), 1);
            $business['count_reviews'] = count($business->reviews);
            return $business;
        });

        $reviews = Review::with('reply')->latest()->take(8)->get();
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
            ];
            return $review;
        });

        return Inertia::render('Welcome/Index', [
            'data' => [
                'categories' => $categories,
                'businesses' => $businesses,
                'reviews' => $reviews,
            ]
            // 'canLogin' => Route::has('login'),
            // 'canRegister' => Route::has('register'),
            // 'laravelVersion' => Application::VERSION,
            // 'phpVersion' => PHP_VERSION,
        ]);
    }


    public function apiSearchHome(Request $request)
    {
        $searchTerm = $request->input('query', '');

        $businesses = Business::where('role', 'owner')
            ->where('company_name', 'like', '%' . $searchTerm . '%')
            ->orWhere('website', 'like', '%' . $searchTerm . '%')
            ->orderBy('created_at', 'desc') // Order by creation date, optional
            ->limit(5) // Limit to 5 results
            ->get();

        $businesses = $businesses->map(function ($business, $index) {
            $business['logo'] = $business->profile?->logo;
            $business['trustscore'] = number_format($business->reviews->avg('rating'), 1);
            $business['count_reviews'] = count($business->reviews);
            return $business;
        });

        $categories = Category::where('name', 'like', '%' . $searchTerm . '%')
            ->select('id', 'name', 'image', DB::raw('1 as is_category')); // Add is_category = 1 for categories

        $sub_categories = SubCategory::where('name', 'like', '%' . $searchTerm . '%')
            ->select('id', 'name', 'image', DB::raw('0 as is_category')); // Add is_category = 1 for categories

        $results = $categories->union($sub_categories)
            ->orderBy('name', 'asc') // Optional: Sort alphabetically
            ->limit(3)
            ->get();

        return response()->json([
            'companies' => $businesses,
            'categories' => $results,
        ]);
    }

    public function search()
    {
        return Inertia::render('Welcome/Search');
    }

    public function show()
    {

    }

    public function update(Request $request)
    {

    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'website' => ['required', 'string', 'max:255'],
            'company_name' => ['required', 'string', 'max:255'],
        ]);

        $business = Business::create($validatedData);
        return redirect()->route('reviews.company', $business->id);
    }
}
