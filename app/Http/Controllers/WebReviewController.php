<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Review;
use App\Models\ReviewThumb;
use App\Models\Business;
use App\Models\User;
use App\Models\Product;
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

        return response()->json([
            'companies' => $businesses,
        ]);
    }

    public function evaluate(Request $request, String $website)
    {
        $business = Business::with(['profile'])->where('website', $website)->first();

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
            "is_product" => "required",
            "date" => "required|date",
        ]);

        $creationData = [
            "title" => $request->input('title'),
            "description" => $request->input('description'),
            "business_id" => $request->input('business_id'),
            "user_id" => auth()->user()->id,
            "date_experience" => $request->input('date'),
            "rating" => $request->input('rating'),
            "is_product" => (int)$request->input('is_product'),
        ];

        Review::create($creationData);

        $business = Business::findOrFail($request->input('business_id'));

        return redirect()->route('reviews.company', $business->website);
    }

    public function company(Request $request, String $website)
    {
        $business = Business::with(['profile', 'primaryBusinessCategory', 'primaryBusinessCategory.subCategory.category', 'products'])->where('website', $website)->first();

        $reviews = Review::where('business_id', $business->id);
        $totalCount = $reviews->count();
        $averageRating = $reviews->average('rating');
        $ratingCounts = $reviews->select('rating', DB::raw('count(*) as count'))
            ->groupBy('rating')
            ->get();

        $stars = array_fill(0, 5, ['count' => 0]);
        foreach ($ratingCounts as $data) {
            $rating = $data['rating'];
            $count = $data['count'];

            // Set the count for the corresponding rating in the stars array
            $stars[$rating - 1]['count'] = $count;
        }

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

        $replyReviews = Review::where('business_id', $business->id)
            ->where('rating', '<', 3)
            ->with('reply')
            ->get();

        $countReply = $replyReviews->filter(function ($review){
            return $review->reply !== null;
        })->count();

        $business['rating_statistic'] = [
            'avg' => number_format($averageRating, 1),
            'total' => $totalCount,
            'stars' => $stars,
            'low_reviews' => [
                'count_reviews' => count($replyReviews),
                'count_replies' => $countReply,
            ]
        ];

        $recent_businesses = Business::latest()->take(4)->where('id', '<>', $business->id)->take(3)->get();
        $recent_businesses = $recent_businesses->map(function ($business, $index) {
            $business['logo'] = $business->profile?->logo;
            $business['trustscore'] = number_format($business->reviews->avg('rating'), 1);
            $business['count_reviews'] = count($business->reviews);
            return $business;
        });

        return Inertia::render('Review/Company', [
            'data' =>[
                'reviews' => $reviews,
                'company' => $business,
                'related_companies' => $recent_businesses,
            ]
        ]);
    }

    public function detail(Request $request, String $id)
    {
        $review = Review::with(['reply'])->findOrFail($id);
        $review['userinfo'] = [
            'id' => $review->user->id,
            'name' => $review->user->name,
            'avatar' => $review->user->profile?->image,
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
            $review['website'] = $review->business->website;
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

    public function thumbup(Request $request)
    {
        $id = $request->input('id', '');
        $review = Review::findOrFail($id);

        if(!Auth::check()){
            return response()->json([
                'status' => 'error',
                'message' => 'Please Login first',
            ]);
        }

        $user = auth()->user()->id;

        if($user == $review->user_id){
            return response()->json([
                'status' => 'warning',
                'message' => 'This review is written by you',
            ]);
        }

        $status = ReviewThumb::where('review_id', $review->id)
            ->where('thumb', true)
            ->where('user_id', $user)
            ->first();

        if($status){
            return response()->json([
                'status' => 'warning',
                'message' => 'You already reported this review',
            ]);
        }

        $creationData = [
            "review_id" => $review->id,
            "user_id" => $user,
            "thumb" => true,
        ];

        ReviewThumb::create($creationData);
        return response()->json([
            'status' => 'success',
            'message' => 'Thanks for your report',
        ]);
    }

    public function thumbdown(Request $request)
    {
        $id = $request->input('id', '');
        $review = Review::findOrFail($id);

        $user = auth()->user()->id;

        if($user == $review->user_id){
            return response()->json([
                'status' => 'warning',
                'message' => 'This review is written by you',
            ]);
        }

        $status = ReviewThumb::where('review_id', $review->id)
            ->where('thumb', false)
            ->where('user_id', $user)
            ->first();

        if($status){
            return response()->json([
                'status' => 'warning',
                'message' => 'You already flagged this review',
            ]);
        }

        $creationData = [
            "review_id" => $review->id,
            "user_id" => $user,
            "thumb" => false,
        ];

        ReviewThumb::create($creationData);
        return response()->json([
            'status' => 'success',
            'message' => 'Thanks for your report',
        ]);
    }

    public function evaluateProduct(Request $request, String $product, String $website)
    {
        $product = Product::findOrFail($product);
        $business = Business::with('profile')->findOrFail($product->business_id);

        return Inertia::render('Review/Evaluate', [
            'product' => $product,
            'company' => $business,
        ]);
    }

    public function storeProduct(Request $request)
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

        $business = Business::findOrFail($request->input('business_id'));

        return redirect()->route('reviews.company', $business->website);
    }
}
