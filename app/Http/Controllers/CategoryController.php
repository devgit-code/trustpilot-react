<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('subcategories')->get();

        return Inertia::render('Category/Index', [
            'categories' => $categories,
        ]);
    }

    public function search()
    {
        return Inertia::render('Category/Search');
    }

    public function show(Request $request)
    {
        return Inertia::render('Category/Detail', [
            'category_name' => "Animals & Pets"
        ]);
    }

    public function detail()
    {
        return Inertia::render('Category/Detail', [
            'category_name' => "Animals & Pets",
            'sub_cat' => 'Cats & Dogs'
        ]);
    }

    public function update(Request $request)
    {

    }
}
