<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Blog;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::all();
        return Inertia::render('About/Index', compact('blogs'));
    }


    public function show(String $blog)
    {
        $blog = Blog::where('slug', $blog)->first();
        $other_blogs = Blog::where('id', '<>', $blog->id)->take(4)->get();
        return Inertia::render('About/Show', compact('blog', 'other_blogs'));
    }

    public function update(Request $request)
    {

    }
}
