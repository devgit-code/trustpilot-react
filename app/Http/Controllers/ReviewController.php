<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Review;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index()
    {
        $categories = Review::all();

        return Inertia::render('Review/Index');
    }

    public function evaluate()
    {
        return Inertia::render('Review/Evaluate');
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
