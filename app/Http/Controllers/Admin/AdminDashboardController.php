<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Business;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        $businesses = Business::where('role', 'owner')->get();
        return Inertia::render('Admin/Dashboard', [
            'data' => [
                'count_users' => count($users),
                'count_businesses' => count($businesses)
            ]
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Cities/Create');
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
