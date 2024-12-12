<?php

namespace App\Http\Middleware;

use App\Models\UserProfile;
use App\Models\BusinessProfile;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => function(){
                    if(auth('web')->check()){
                        $user = auth()->user();
                        return [
                            'id'=>$user->id,
                            'name'=>$user->name,
                            'email'=>$user->email,
                            'email_verified_at'=>$user->email_verified_at,
                        ];
                    }else if(auth('business')->check()){
                        $business = auth('business')->user();
                        return [
                            'id'=>$business->id,
                            'company_name'=>$business->company_name,
                            'first_name'=>$business->first_name,
                            'last_name'=>$business->last_name,
                            'role'=>$business->role,
                        ];
                    }
                    return null;
                },
                'userProfileImage' => function () {
                    if(auth('web')->check()){
                        $user = auth()->user();
                        $userProfile = $user ? UserProfile::where('user_id', $user->id)->first() : null;
                        return $userProfile ? $userProfile->image : null;
                    }else if(auth('business')->check()){
                        $business = auth('business')->user();
                        $businessProfile = $business ? BusinessProfile::where('business_id', $business->id)->first() : null;
                        return $businessProfile ? $businessProfile->logo : null;

                    }
                    return null;
                },
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'success' => fn () => $request->session()->get('success'),
                'warning' => fn () => $request->session()->get('warning'),
                'error' => fn () => $request->session()->get('error')
            ],
        ]);
    }
}
