<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\BusinessCategory;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sub_categories = SubCategory::all();

        $business = auth('business')->user();
        $categories = $business->businessCategories;    //primaryBusinessCategory

        return Inertia::render('Business/Category/Index', compact('categories', 'sub_categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Business/Category/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            "id" => "required|max:255"
        ]);

        $business = auth('business')->user();

        $creationData = [
            "sub_category_id" => $request->input('id'),
            "business_id" => $business->id,
        ];

        $businessCat = BusinessCategory::create($creationData);
        if(count($business->businessCategories) === 1) //only one
        {
            $businessCat->is_primary = true;
            $businessCat->save();
        }

        return redirect()->route('business.categories.index');
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

    }

    public function update(Request $request, string $id)
    {
        $business = auth('business')->user();
        $primaryCategory = $business->primaryBusinessCategory;

        if($primaryCategory)
        {
            $primaryCategory->is_primary = false;
            $primaryCategory->save();
        }

        $category = BusinessCategory::findOrFail($id);
        $category->is_primary = true;
        $category->save();

        return redirect()->route('business.categories.index');
    }

    public function destroy(BusinessCategory $category)
    {
        $category->delete();

        $business = auth('business')->user();
        $primaryCategory = $business->primaryBusinessCategory;
        if(!$primaryCategory){
            $firstCategory = $business->businessCategories->first();

            if ($firstCategory) {
                $firstCategory->is_primary = true;
                $firstCategory->save();
            }
        }

        return redirect()->route('business.categories.index')->with('success', 'Role deleted successfully.');
    }
}
