<?php

namespace App\Http\Controllers\Business;

use App\Models\BusinessProfile;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{

    public function index()
    {
        $business = auth('business')->user();
        $businessProfile = $business->profile;

        return Inertia::render('Business/Profile/Index', [
            'businessProfile' => $businessProfile,
            'business' => $business,
            'activeTab'=>session('activeTab') ?? 'home'
        ]);
    }

    public function profile()
    {
        return redirect()->route('business.profile.index')->with('activeTab', 'profile');
    }

    public function logo_update(Request $request)
    {
        $request->validate([
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
        ]);

        $business = auth('business')->user();
        $businessProfile = $business->profile;

        if (!$businessProfile) {
            $businessProfile = new BusinessProfile();
            $businessProfile->business_id = $business->id;
        }

        if (
            $request->hasFile('image')
        ) {
            $extension = $request->file('image')->getClientOriginalExtension();
            $imageName = "BusinessProfile-" . now()->timestamp . "." . $extension;
            $path = $request->file('image')->storeAs('images/logo', $imageName, 'public');
            // Storage::disk('public')->put(
            //     'images/logo/' . $imageName,
            //     file_get_contents($request->image)
            // );
            $businessProfile["logo"] = $imageName;

            $businessProfile->save();
        }

        return redirect()->route('business.profile.index')->with('acctiveTab', 'logo');
    }

    public function update(Request $request)
    {
        // $settings = $request->except('_token', '_method');
        // foreach ($settings as $key => $value) {
        //     switch ($key) {
        //         case ('logo'):
        //             if ($request->croppedImage != null) {
        //                 $extension = explode('/', mime_content_type($request->croppedImage))[1];
        //                 $imageName = "logo-" . now()->timestamp . "." . $extension;
        //                 Storage::disk('public')->put(
        //                     $imageName,
        //                     file_get_contents($request->croppedImage)
        //                 );
        //                 $setting = Setting::where('key', $key)->first();
        //                 $setting->value = $imageName;
        //                 $setting->save();
        //             }
        //             break;

        //         case ('fav_icon'):
        //             if ($request->croppedImage != null) {
        //                 $extension = explode('/', mime_content_type($request->croppedImage))[1];
        //                 $imageName = "favicon-" . now()->timestamp . "." . $extension;
        //                 Storage::disk('public')->put(
        //                     $imageName,
        //                     file_get_contents($request->croppedImage)
        //                 );
        //                 $setting = Setting::where('key', $key)->first();
        //                 $setting->value = $imageName;
        //                 $setting->save();
        //             }
        //             break;

        //         default:
        //             $setting = Setting::where('key', $key)->first();
        //             if ($setting) {
        //                 $setting->value = $value ?? '';
        //                 $setting->save();
        //             }
        //             break;
        //     }
        // }

        return to_route('business.profile.index');
    }

    public function home(Request $request)
    {
        $request->validate([
            "company_name" => "required|string|max:255",
            // "website" => "required|url",
        ]);

        $business = auth('business')->user();

        $company_name = $request->input('company_name');
        $first_name = $request->input('first_name');
        $last_name = $request->input('last_name');
        $job_title = $request->input('job_title');

        if (
            $business->company_name !== $company_name ||
            $business->first_name !== $first_name ||
            $business->last_name !== $last_name ||
            $business->job_title !== $job_title
        ) {
            $business->company_name = $company_name;
            $business->first_name = $first_name;
            $business->last_name = $last_name;
            $business->job_title = $job_title;
            $business->save();

        }

        return redirect()->route('business.profile.index');
    }

    public function account(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'job_title' => 'required|string|max:255',
        ]);

        $business = auth('business')->user();

        $first_name = $request->input('first_name');
        $last_name = $request->input('last_name');
        $job_title = $request->input('job_title');

        if (
            $business->first_name !== $first_name ||
            $business->last_name !== $last_name ||
            $business->job_title !== $job_title
        ) {
            $business->first_name = $first_name;
            $business->last_name = $last_name;
            $business->job_title = $job_title;

            $business->save();
        }

        return redirect()->route('business.profile.index')->with('activeTab', 'account');
    }

    public function contact(Request $request)
    {
        $request->validate([
            "email" => "nullable|email|max:255",
            "phone" => 'nullable|regex:/^\+?[0-9]{10,15}$/',
            "location" => "nullable|string|max:255",
            "description" => "nullable|string",
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
        ]);

        $business = auth('business')->user();
        $businessProfile = $business->profile;

        if (!$businessProfile) {
            $businessProfile = new BusinessProfile();
            $businessProfile->business_id = $business->id;
        }


        if (
            $request->hasFile('image')
        ) {
            $extension = $request->file('image')->getClientOriginalExtension();
            $imageName = "BusinessProfile-" . now()->timestamp . "." . $extension;
            $path = $request->file('image')->storeAs('images/logo', $imageName, 'public');
            $businessProfile["logo"] = $imageName;
            $businessProfile->save();
        }

        $email = $request->input('email');
        $phone = $request->input('phone');
        $location = $request->input('location');
        $description = $request->input('description');

        if (
            $businessProfile->email !== $email ||
            $businessProfile->phone !== $phone ||
            $businessProfile->location !== $location ||
            $businessProfile->description !== $description
        ) {
            $businessProfile->email = $email;
            $businessProfile->phone = $phone;
            $businessProfile->location = $location;
            $businessProfile->description = $description;

            $businessProfile->save();
        }

        return redirect()->route('business.profile.index');
    }
}
