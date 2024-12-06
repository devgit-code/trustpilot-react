<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        return Inertia::render('Welcome/Index', [
            'data' => [
                'categories' => $categories,
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
