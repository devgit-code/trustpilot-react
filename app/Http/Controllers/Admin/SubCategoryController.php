<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(String $id)
    {
        $category = Category::find($id);
        $subCategories = SubCategory::withCount('businesses')->with(['category'])->where('category_id', $id)->get();

        // $subCategories = $subCategories->map(function ($category, $index) {
        //     $category['count_businesses'] = count($category->businesses);
        //     return $category;
        // });

        return Inertia::render('Admin/SubCategories/Index', compact('category', 'subCategories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(String $id)
    {
        $category = Category::find($id);
        return Inertia::render('Admin/SubCategories/Create', compact('category'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
            'name' => 'required|string|unique:sub_categories,name',
            'category_id' => 'required',
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        if ($request->hasFile('image')) {
            $extension = $request->file('image')->getClientOriginalExtension();
            $imageName = "sub-category-" . now()->timestamp . "." . $extension;
            $path = $request->file('image')->storeAs('images/category', $imageName, 'public');
            $validated['image'] = $path; // Add the avatar path to the validated data
        }

        SubCategory::create($validated);

        return redirect()->route('admin.sub_categories.index', $request->category_id)
            ->with('message', 'SubCategory created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        $subCategory = SubCategory::with('category')->find($id);
        $category = $subCategory->category;
        return Inertia::render('Admin/SubCategories/Edit', compact('subCategory', 'category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $subCategory = SubCategory::find($id);
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                Rule::unique('sub_categories', 'name')->ignore($subCategory->id),
            ],
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
        ]);

        $subCategory->name = $request->name;
        $subCategory->slug = Str::slug($request->name);

        if ($request->hasFile('image')) {
            $extension = $request->file('image')->getClientOriginalExtension();
            $imageName = "sub-category-" . now()->timestamp . "." . $extension;
            $path = $request->file('image')->storeAs('images/category', $imageName, 'public');
            $subCategory['image'] = $path; // Add the avatar path to the validated data
        }

        $subCategory->save();

        return redirect()->route('admin.sub_categories.index', $request->category_id)
            ->with('message', 'SubCategory updated successfully.');
    }

    public function detail(string $id)
    {
        $subCategory = SubCategory::with('category', 'businesses')->find($id);

        $businesses = $subCategory->businesses;
        $businesses = $businesses->map(function ($business, $index){
            $business['trustscore'] = number_format($business->reviews->avg('rating'), 1);
            $business['count_reviews'] = count($business->reviews);
            $business['logo'] = $business->profile?->img;
            return $business;
        });

        return Inertia::render('Admin/SubCategories/Detail', compact('subCategory', 'businesses'));
    }


    public function destroy(Request $request, string $id)
    {
        $subCategory = SubCategory::find($id);
        $subCategory->delete();

        return redirect()->back()
            ->with('message', 'SubCategory deleted successfully.');
    }
}
