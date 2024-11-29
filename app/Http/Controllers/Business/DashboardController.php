<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $cities = City::all();
        return Inertia::render('Business/Dashboard');
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

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


    public function edit(string $id)
    {

    }


    public function update(Request $request, string $id)
    {

    }



    public function destroy(string $id)
    {
        //
    }
}
