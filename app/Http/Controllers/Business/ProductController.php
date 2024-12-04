<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\Product;
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
        $request->validate([
            "name" => "required|max:255"
        ]);

        $creationData = [
            "name" => $request->input('name'),
            "description" => $request->input('description'),
            "business_id" => auth('business')->user()->id,
        ];

        Product::create($creationData);

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
            "name" => "required|max:255"
        ]);

        $product = Product::findOrFail($id);

        $updateData = [
            "name" => $request->input('name'),
            "description" => $request->input('description'),
        ];

        $product->update($updateData);
        return redirect()->route('business.products.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('business.products.index')->with('success', 'Role deleted successfully.');
    }
}
