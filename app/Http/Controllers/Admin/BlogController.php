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
        $validated = $request->validate([
            'title' => 'required|string|unique:blogs,title|max:255',
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
            'content' => 'required|string',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('image')) {
            $extension = $request->file('image')->getClientOriginalExtension();
            $imageName = "blog-" . now()->timestamp . "." . $extension;
            $path = $request->file('image')->storeAs('images/blog', $imageName, 'public');
            $validated['image'] = $path; // Add the avatar path to the validated data
            // $validated['slug'] = Str::slug($validated['title']);
        }

        $category = Blog::create($validated);

        return redirect()->route('admin.blogs.index')
            ->with('message', 'Blog created successfully.');
    }

    public function edit(Blog $blog)
    {
        return Inertia::render('Admin/Blog/Edit', [
            'blog' => $blog
        ]);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                Rule::unique('blogs', 'title')->ignore($blog->id),
            ],
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
            'content' => 'required|string',
        ]);

        $blog->title = $request->input('title');
        $blog->slug = Str::slug($request->input('title'));
        $blog->content = $request->input('content');

        if ($request->hasFile('image')) {
            $extension = $request->file('image')->getClientOriginalExtension();
            $imageName = "blog-" . now()->timestamp . "." . $extension;
            $path = $request->file('image')->storeAs('images/blog', $imageName, 'public');
            $blog->image = $path; // Add the avatar path to the validated data
        }

        $blog->save();

        return redirect()->route('admin.blogs.index')
            ->with('message', 'Blog updated successfully.');

    }


    public function destroy(Blog $blog)
    {
        $blog->delete();

        return redirect()->route('admin.blogs.index')
            ->with('success', 'Blog deleted successfully.');

    }
}
