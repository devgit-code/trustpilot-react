<?php

namespace App\Http\Controllers;

use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserProfileController extends Controller
{

    public function show()
    {
        $user = auth()->user();
        $userProfile = $user->profile;
        return Inertia::render('Profile/Setting', [
            'status' => session('status'),
            'userProfile' => $userProfile
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $userProfile = $user->userProfile;

        if (!$userProfile) {
            $userProfile = new UserProfile();
            $userProfile->user_id = $user->id;
        }

        $address = $request->input('address');
        $phone = $request->input('phone');

        if (
            $userProfile->address !== $address ||
            $userProfile->phone !== $phone ||
            $request->croppedImage != null
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
            return redirect()->route('profile.setting')->with('status', 'Profile information updated successfully');
        }

        return redirect()->route('profile.setting');
    }
}
