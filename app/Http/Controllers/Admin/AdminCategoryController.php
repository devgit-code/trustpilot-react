<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Str;

class AdminCategoryController extends Controller
{

    public function index()
    {
        $categories = Category::withCount('subcategories')->get();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Categories/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:categories,name',
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Handle the avatar upload if it exists
        if ($request->hasFile('image')) {
            $extension = $request->file('image')->getClientOriginalExtension();
            $imageName = "category-" . now()->timestamp . "." . $extension;
            $path = $request->file('image')->storeAs('images/category', $imageName, 'public');
            $validated['image'] = $path; // Add the avatar path to the validated data
        }

        $category = Category::create($validated);

        return redirect()->route('admin.categories.index')
            ->with('message', 'Category created successfully.');
    }

    public function edit(String $id)
    {
        $category = Category::find($id);
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category
        ]);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                Rule::unique('categories', 'name')->ignore($category->id),
            ],
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $category->name = $request->input('name');

        if ($request->hasFile('image')) {
            $extension = $request->file('image')->getClientOriginalExtension();
            $imageName = "category-" . now()->timestamp . "." . $extension;
            $path = $request->file('image')->storeAs('images/category', $imageName, 'public');
            $category->image = $path; // Add the avatar path to the validated data
        }

        $category->save();

        return redirect()->route('admin.categories.index')
            ->with('message', 'Category updated successfully.');
    }


    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->route('admin.categories.index')
            ->with('success', 'Category deleted successfully.');
    }
}
