<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use App\Models\User;
use App\Models\UserProfile;
use App\Models\Review;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Users/Index');
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
        $data = $query->paginate(10, ['*'], 'page', $page);
        $users = collect($data->items())->map(function ($user, $index) {
            $user['reviews_count'] = count($user->reviews);
            return $user;
        });

        return response()->json([
            'users' => $users,
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
            'userProfile' => $user->profile,
            'has_reviews' => count($user->reviews)
        ]);
    }

    public function apiDetail(Request $request, string $id)
    {
        $user = User::where('id', $id)->with('profile')->first();

        $page = $request->input('page', 1); // Default to page 1
        $sortOrder = $request->input('sort_by_date', 'desc');
        $rating = $request->input('rating');
        $searchTerm = $request->input('search');

        $query = Review::query()->where('user_id', $user->id)->with(['user', 'business']);

        if ($rating) {
            $query->where('rating', $rating);
        }

        if($searchTerm){
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                    ->orWhereHas('user', function ($userQuery) use ($searchTerm) {
                        $userQuery->where('name', 'like', "%{$searchTerm}%");
                    });
                    // ->orWhereHas('business', function ($businessQuery) use ($searchTerm) {
                    //     $businessQuery->where('name', 'like', "%{$searchTerm}%");
                    // });
            });
        }

        $query->orderBy('date_experience', $sortOrder);

        // Paginate the results
        $reviews = $query->paginate(10, ['*'], 'page', $page);

        return response()->json([
            'reviews' => $reviews->items(),
            'filters' => $request->only('sort_by_date', 'rating'),
            'pagination' => [
                'current_page' => $reviews->currentPage(),
                'last_page' => $reviews->lastPage(),
                'per_page' => $reviews->perPage(),
                'total' => $reviews->total(),
                'links' => [
                    'first' => $reviews->url(1),
                    'last' => $reviews->url($reviews->lastPage()),
                    'next' => $reviews->nextPageUrl(),
                    'prev' => $reviews->previousPageUrl(),
                ],
            ],
        ]);

    }


    public function edit(User $user)
    {

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


    public function update(Request $request, String $user)
    {
        $user = User::findOrFail($user);
        $userProfile = $user->userProfile;

        $name = $request->input('name');
        if (
            $user->name !== $name
        ) {
            $user->name = $name;
            $user->slug = Str::slug($name);

            $user->save();
        }

        if (!$userProfile) {
            $userProfile = new UserProfile();
            $userProfile->user_id = $user->id;
        }

        $address = $request->input('address');
        $phone = $request->input('phone');

        if (
            $userProfile->address !== $address ||
            $userProfile->phone !== $phone
        ) {
            $existingUserProfile = UserProfile::where('user_id', $user->id)->first();

            if ($existingUserProfile) {
                $existingUserProfile->address = $address;
                $existingUserProfile->phone = $phone;

                if ($request->filled('croppedImage')) {
                    $extension = explode('/', mime_content_type($request->croppedImage))[1];
                    $imageName = "UserProfile-" . now()->timestamp . "." . $extension;
                    Storage::disk('public')->put(
                        'images/profile/' . $imageName,
                        file_get_contents($request->croppedImage)
                    );
                    $existingUserProfile["image"] = $imageName;
                }

                $existingUserProfile->save();
            } else {
                $userProfile->address = $address;
                $userProfile->phone = $phone;

                if ($request->filled('croppedImage')) {
                    $extension = explode('/', mime_content_type($request->croppedImage))[1];
                    $imageName = "UserProfile-" . now()->timestamp . "." . $extension;
                    Storage::disk('public')->put(
                        'images/profile/' . $imageName,
                        file_get_contents($request->croppedImage)
                    );
                    $userProfile["image"] = $imageName;
                }

                $userProfile->save();
            }
            return redirect()->route('admin.users.show', $user)->with('status', 'Profile information updated successfully');
        }

        return redirect()->route('admin.users.show', $user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.');
    }
}
