<?php

namespace App\Http\Controllers\Admin;

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
        $products = Product::all();
        return Inertia::render('Admin/Product/Index', compact('products'));
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Product/Create');
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
        return Inertia::render('Admin/Product/Edit', compact('product'));
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
