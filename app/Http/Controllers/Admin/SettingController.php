<?php

namespace App\Http\Controllers\Admin;

use App\Models\BusinessProfile;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{

    public function index()
    {
        $business = auth('business')->user();
        $businessProfile = $business->profile;

        return Inertia::render('Admin/Setting/Index', [
            'businessProfile' => $businessProfile,
            'activeTab'=>session('activeTab') ?? 'home'
        ]);
    }

    public function logo()
    {
        return redirect()->route('admin.settings.index')->with('activeTab', 'logo');
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

        return to_route('admin.settings.index');
    }

    public function home(Request $request)
    {
        $request->validate([
            "company_name" => "required|string|max:255",
            "website" => "required|url",
            "description" => "required",
        ]);

        $business = auth('business')->user();
        $businessProfile = $business->profile;

        if (!$businessProfile) {
            $businessProfile = new BusinessProfile();
            $businessProfile->business_id = $business->id;
        }

        $company_name = $request->input('company_name');
        $website = $request->input('website');
        $description = $request->input('description');

        if (
            $business->company_name !== $company_name ||
            $business->website !== $website ||
            $businessProfile->description !== $description
        ) {
            $business->company_name = $company_name;
            $business->website = $website;
            $business->save();

            $businessProfile->description = $description;
            $businessProfile->save();

            // $existingbusinessProfile = BusinessProfile::where('business_id', $business->id)->first();

            // if ($existingbusinessProfile) {
            //     $existingbusinessProfile->description = $description;

            //     $existingbusinessProfile->save();
            // } else {
            //     $businessProfile->description = $description;

            //     $businessProfile->save();
            // }
        }

        return redirect()->route('admin.settings.index');
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

        return redirect()->route('admin.settings.index')->with('activeTab', 'account');
    }
}
