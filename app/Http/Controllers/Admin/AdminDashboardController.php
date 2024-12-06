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
        $request->validate([
            "name" => "required|max:255"
        ]);

        $creationData = [
            "name" => $request->input('name'),
            "status" => $request->input('status')
        ];

        City::create($creationData);

        return redirect()->route('cities.index');
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
        $city = City::find($id);
        $state = State::find($id);
        return Inertia::render('Cities/Edit', [
            'city' => $city, 'state' => $state
        ]);
    }


    public function update(Request $request, string $id)
    {
        $request->validate([
            "name" => "required|max:255"
        ]);

        $city = City::findOrFail($id);

        $updateData = [
            "name" => $request->input('name'),
            "status" => $request->input('status')
        ];

        $city->update($updateData);
        return redirect()->route('state.cities', ['state'=> $city->state_id]);
    }



    public function destroy(string $id)
    {
        //
    }
}
