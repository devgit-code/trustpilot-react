<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use App\Models\Business;
use App\Models\Review;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        $businesses = Business::latest()->take(4)->get();
        $businesses = $businesses->map(function ($business, $index) {
            $business['logo'] = $business->profile?->logo;
            $business['trustscore'] = round($business->reviews->avg('rating'), 1);
            $business['count_reviews'] = count($business->reviews);
            return $business;
        });

        $reviews = Review::latest()->take(8)->get();
        $reviews = $reviews->map(function ($review, $index) {
            $review['user'] = [
                'name'=>$review->user->name,
                'avatar'=>$review->user->profile?->image,
            ];
            $review['company'] = [
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

    public function show()
    {

    }

    public function update(Request $request)
    {

    }
}
