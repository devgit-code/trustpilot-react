<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->input('page', 1);

        $data = User::paginate(10, ['*'], 'page', $page);
        $users = $data->getCollection()->map(function ($user, $index) {
            $user['review_count'] = count($user->reviews);
            return $user;
        });

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
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

    public function apiIndex(Request $request)
    {
        $page = $request->input('page', 1); // Default to page 1
        $searchTerm = $request->input('search');

        $query = User::query()->with(['profile']);

        if($searchTerm){
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%");
            });
        }

        // Paginate the results
        $users = $query->paginate(10, ['*'], 'page', $page);

        return response()->json([
            'users' => $users->items(),
            'filters' => $request->only('sort_by_date', 'rating'),
            'pagination' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
                'links' => [
                    'first' => $users->url(1),
                    'last' => $users->url($users->lastPage()),
                    'next' => $users->nextPageUrl(),
                    'prev' => $users->previousPageUrl(),
                ],
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        User::create($validatedData);

        return redirect()->route('admin.users.index');
    }

    public function show(User $user)
    {
        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
        ]);
    }


    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'userProfile' => $user->profile,
        ]);
    }
    public function userRoles($id)
    {
        $user = User::with('roles')->findOrFail($id);
        $roles = Role::all();

        return Inertia::render('Admin/Users/Roles', ['roles' => $roles, 'id' => $id, 'user' => $user]);
    }

    public function saveRole(Request $request)
    {

        $user = User::findOrFail($request->input('user_id'));
        $selectedRoles = $request->input('roles') ?? [];

        $existingRoles = $user->roles->pluck('id')->toArray();

        $rolesToRemove = array_diff($existingRoles, $selectedRoles);
        foreach ($rolesToRemove as $roleId) {
            $role = Role::findOrFail($roleId);
            $user->removeRole($role);
        }

        foreach ($selectedRoles as $roleId) {
            $role = Role::findOrFail($roleId);
            if (!$user->hasRole($role)) {
                $user->assignRole($role);
            }
        }

        return redirect()->route('admin.users.roles', $user->id);
    }


    public function update(Request $request, User $user)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user)],
            'password' => ['nullable', 'string', 'min:8'],
        ]);

        $user->update($validatedData);

        return redirect()->route('admin.users.index');
    }

    public function destroy(String $id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return to_route('admin.users.index');
        }
    }
}
