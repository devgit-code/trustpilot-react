<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Review;
use App\Models\ReviewThumb;
use App\Models\Business;
use App\Models\User;
use Inertia\Inertia;

class WebReviewController extends Controller
{
    public function write()
    {
        $businesses = Business::latest()->take(4)->get();
        $businesses = $businesses->map(function ($business, $index) {
            $business['logo'] = $business->profile?->logo;
            $business['trustscore'] = number_format($business->reviews->avg('rating'), 1);
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
            $business['trustscore'] = number_format($business->reviews->avg('rating'), 1);
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

        $reviews = Review::where('business_id', $business->id)
            ->whereNotNull('user_id') // Optional: To ensure there is a linked user
            ->orderBy('date_experience', 'desc')
            ->with(['reply', 'business'])
            ->get();

        $reviews = $reviews->map(function ($review, $index) {
            $review['userinfo'] = [
                'id'=>$review->user->id,
                'name'=>$review->user->name,
                'avatar'=>$review->user->profile?->image,
                'count_reviews'=>count($review->user->reviews),
                'location'=>$review->user->profile?->address,
            ];
            return $review;
        });

        $business['rating_statistic'] = [
            'avg' => number_format($averageRating, 1),
            'total' => $totalCount,
            'stars' => $ratingCounts->map(function ($item) {
                return [
                    'rating' => $item->rating,
                    'count' => $item->count,
                ];
            }),
        ];

        return Inertia::render('Review/Company', [
            'data' =>[
                'reviews' => $reviews,
                'company' => $business,
            ]
        ]);
    }

    public function detail(Request $request, String $id)
    {
        $review = Review::with(['reply'])->findOrFail($id);
        $review['userinfo'] = [
            'id' => $review->user->id,
            'name' => $review->user->name,
            'avatar' => $review->user->profile->image,
        ];
        $review['business'] = $review->business;

        return Inertia::render('Review/Detail', [
            'review'=>$review
        ]);
    }

    public function user(Request $request, String $id)
    {
        $user = User::findOrFail($id);

        $reviews = Review::where('user_id', $user->id)
            ->whereNotNull('user_id') // Optional: To ensure there is a linked user
            ->orderBy('date_experience', 'desc')
            ->with(['reply', 'business'])
            ->get();

        $reviews = $reviews->map(function ($review, $index) {
            $review['userinfo'] = [
                'id'=>$review->user->id,
                'name'=>$review->user->name,
                'avatar'=>$review->user->profile?->image,
                'count_reviews'=>count($review->user->reviews),
                'location'=>$review->user->profile?->address,
            ];
            $review['business_name'] = $review->business->company_name;
            return $review;
        });

        return Inertia::render('Review/User', [
            'data'=>[
                'reviews'=>$reviews,
                'user'=>$user,
                'userinfo'=>[
                    'avatar'=>$user->profile?->img,
                    'location'=>$user->profile?->address,
                ]
            ]
        ]);
    }

    public function update(Request $request)
    {

    }

    public function thumbup(Request $request, Review $review)
    {
        $user = auth()->user()->id;

        if($user == $review->user_id)
            return redirect()->back()->withFlash('message', 'same-user-error');

        $status = ReviewThumb::where('review_id', $review->id)
            ->where('thumb', true)
            ->where('user_id', $user)
            ->first();

        if($status)
            return redirect()->back()->withFlash('message', 'already-user-error');

        $creationData = [
            "review_id" => $review->id,
            "user_id" => $user,
            "thumb" => true,
        ];

        ReviewThumb::create($creationData);
        return redirect()->back()->with('status', 'success');
    }

    public function thumbdown(Request $request, Review $review)
    {
        $user = auth()->user()->id;

        if($user == $review->user_id){
            session()->flash('message', 'Cannot from Same user');
            return redirect()->back();
        }

        $status = ReviewThumb::where('review_id', $review->id)
            ->where('thumb', false)
            ->where('user_id', $user)
            ->first();

        if($status){
            session()->flash('message', 'You already did this');
            return redirect()->back();
        }

        $creationData = [
            "review_id" => $review->id,
            "user_id" => $user,
            "thumb" => false,
        ];

        ReviewThumb::create($creationData);
        return redirect()->back()->with('status', 'success');
    }
}
