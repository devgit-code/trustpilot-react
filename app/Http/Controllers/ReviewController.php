<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Review;
use App\Models\Business;
use Inertia\Inertia;

class ReviewController extends Controller
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

    public function evaluate(Request $request, String $id)
    {
        $business = Business::with(['profile'])->findOrFail($id);
        return Inertia::render('Review/Evaluate', [
            'company' => $business
        ]);
    }

    public function company()
    {
        return Inertia::render('Review/Company');
    }

    public function detail()
    {
        return Inertia::render('Review/Detail');
    }

    public function user()
    {
        return Inertia::render('Review/User');
    }

    public function update(Request $request)
    {

    }
}
