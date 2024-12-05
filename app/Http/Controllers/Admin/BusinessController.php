<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Business;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BusinessController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Business/Index');
    }

    public function apiIndex(Request $request)
    {
        $page = $request->input('page', 1); // Default to page 1
        $searchTerm = $request->input('search');

        $query = Business::query()->where('role', 'owner')->with(['profile']);

        if($searchTerm){
            $query->where(function ($q) use ($searchTerm) {
                $q->where('company_name', 'like', "%{$searchTerm}%");
                    // ->where('company_name', 'like', "%{$searchTerm}%");
            });
        }

        // Paginate the results
        $data = $query->paginate(10, ['*'], 'page', $page);
        $businesses = $data->getCollection()->map(function ($business, $index) {
            $business['trustscore'] = round($business->reviews->avg('rating'), 1);
            $business['reviews_count'] = count($business->reviews);
            return $business;
        });

        return response()->json([
            'businesses' => $businesses,
            'filters' => $request->only('page', 'search'),
            'pagination' => [
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'per_page' => $data->perPage(),
                'total' => $data->total(),
                'links' => [
                    'first' => $data->url(1),
                    'last' => $data->url($data->lastPage()),
                    'next' => $data->nextPageUrl(),
                    'prev' => $data->previousPageUrl(),
                ],
            ],
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Business/Create');
    }

    public function store(Request $request)
    {

    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }


    public function edit(String $id)
    {
        $business = Business::where('id', $id)->with('profile')->first();
        return Inertia::render('Admin/Business/Edit', compact('business'));
    }


    public function update(Request $request, string $id)
    {

    }

    public function destroy(Business $business)
    {
        $business->delete();
        return redirect()->route('admin.businesses.index')->with('success', 'Role deleted successfully.');
    }
}
