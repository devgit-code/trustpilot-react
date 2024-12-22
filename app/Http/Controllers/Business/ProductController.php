<?php

namespace App\Http\Controllers\Business;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $business = auth('business')->user();
        $products = Product::where('business_id', $business->id)->get();
        return Inertia::render('Business/Product/Index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Business/Product/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => "required|string|max:255",
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
        ]);

        $business = auth('business')->user();
        $validated['business_id'] = $business->id;

        // Handle the avatar upload if it exists
        if ($request->hasFile('image')) {
            $extension = $request->file('image')->getClientOriginalExtension();
            $imageName = "product-" . now()->timestamp . "." . $extension;
            $path = $request->file('image')->storeAs('images/product', $imageName, 'public');
            $validated['image'] = $path; // Add the avatar path to the validated data
        }

        $product = Product::create($validated);

        return redirect()->route('business.products.index');
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
        $product = Product::find($id);
        return Inertia::render('Business/Product/Edit', compact('product'));
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            "name" => "required|max:255",
        ]);

        $product = Product::findOrFail($id);

        $product->name = $request->input('name');

        if ($request->hasFile('image')) {
            $extension = $request->file('image')->getClientOriginalExtension();
            $imageName = "product-" . now()->timestamp . "." . $extension;
            $path = $request->file('image')->storeAs('images/product', $imageName, 'public');
            $product->image = $path; // Add the avatar path to the validated data
        }

        $product->save();

        return redirect()->route('business.products.index');
    }

    public function destroy(Product $product)
    {
        // $business = Auth::guard('business')->user();
        Review::where('is_product', $product->id)->delete();

        $product->delete();
        return redirect()->route('business.products.index')->with('success', 'Product deleted successfully.');
    }
}
