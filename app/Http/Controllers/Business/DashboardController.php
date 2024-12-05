<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $business = auth('business')->user();
        $averageRating = $business->reviews->avg('rating');

        return Inertia::render('Business/Dashboard', [
            'average_rating' => round($averageRating, 1),
            'total_reviews' => count($business->reviews),
            'total_products' => count($business->products),
        ]);
    }
}
