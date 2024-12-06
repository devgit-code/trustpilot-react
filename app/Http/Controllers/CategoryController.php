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
        $categories = Category::all();

        return Inertia::render('Category/Index');
    }

    public function show()
    {
        return Inertia::render('Category/Detail', [
            'category_name' => "Animals & Pets"
        ]);
    }

    public function subcat()
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
