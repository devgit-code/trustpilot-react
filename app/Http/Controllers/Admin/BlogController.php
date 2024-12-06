<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BlogController extends Controller
{

    public function index()
    {
        $blogs = Blog::all();

        return Inertia::render('Admin/Blog/Index', compact('blogs'));

    }

    public function create()
    {
        return Inertia::render('Admin/Blog/Create');
    }

    public function store(Request $request)
    {
        logger($request);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $blog = Blog::create($validated);

        return response()->json([
            'message' => 'Blog post saved successfully.',
            'blog' => $blog,
        ], 200);
    }

    public function edit(String $id)
    {

    }

    public function update(Request $request, $id)
    {

    }


    public function destroy(Blog $blog)
    {

    }
}
