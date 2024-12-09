<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Review;
use App\Models\Business;
use Inertia\Inertia;

class WebReviewController extends Controller
{
    public function write()
    {
        $categories = Review::all();

        $businesses = Business::latest()->take(4)->get();
        $businesses = $businesses->map(function ($business, $index) {
            $business['logo'] = $business->profile?->logo;
            $business['trustscore'] = round($business->reviews->avg('rating'), 1);
            $business['count_reviews'] = count($business->reviews);
            return $business;
        });

        return Inertia::render('Review/Index', [
            'companies'=>$businesses
        ]);
    }


    public function apiSearchCompany(Request $request)
    {
        $searchTerm = $request->input('query', '');

        $businesses = Business::where('role', 'owner')
            ->where('company_name', 'like', '%' . $searchTerm . '%')
            ->orderBy('created_at', 'desc') // Order by creation date, optional
            ->limit(5) // Limit to 5 results
            ->get();

        $businesses = $businesses->map(function ($business, $index) {
            $business['logo'] = $business->profile?->logo;
            $business['trustscore'] = round($business->reviews->avg('rating'), 1);
            $business['count_reviews'] = count($business->reviews);
            return $business;
        });

        return response()->json([
            'companies' => $businesses,
        ]);
    }

    public function evaluate(Request $request, String $id)
    {
        $business = Business::with(['profile'])->findOrFail($id);

        return Inertia::render('Review/Evaluate', [
            'company' => $business
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            "title" => "required|max:255",
            "description" => "required|string",
            "business_id" => "required",
            "rating" => "required",
            "date" => "required|date",
        ]);

        $creationData = [
            "title" => $request->input('title'),
            "description" => $request->input('description'),
            "business_id" => $request->input('business_id'),
            "user_id" => auth()->user()->id,
            "date_experience" => $request->input('date'),
            "rating" => $request->input('rating'),
        ];

        Review::create($creationData);

        return redirect()->route('reviews.company', $request->input('business_id'));
    }

    public function company(Request $request, String $id)
    {
        $business = Business::with(['profile', 'primaryBusinessCategory', 'primaryBusinessCategory.subCategory.category'])->findOrFail($id);

        $reviews = Review::where('business_id', $business->id);
        $totalCount = $reviews->count();
        $averageRating = $reviews->average('rating');
        $ratingCounts = $reviews->select('rating', DB::raw('count(*) as count'))
            ->groupBy('rating')
            ->orderBy('rating', 'desc')
            ->get();

        $business['rating_statistic'] = [
            'avg' => $averageRating,
            'total' => $totalCount,
            'stars' => $ratingCounts->map(function ($item) {
                return [
                    'rating' => $item->rating,
                    'count' => $item->count,
                ];
            }),
        ];

        return Inertia::render('Review/Company', [
            'company' => $business
        ]);
    }

    public function detail(Request $request, String $id)
    {
        $review = Review::with(['reply'])->findOrFail($id);
        $review['user'] = [
            'name' => $review->user->name,
            'avatar' => $review->user->profile->image,
        ];
        $review['company'] = $review->business;

        return Inertia::render('Review/Detail', compact('review'));
    }

    public function user()
    {
        return Inertia::render('Review/User');
    }

    public function update(Request $request)
    {

    }
}
