<?php

namespace App\Http\Middleware;

use App\Models\UserProfile;
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
        $authenticated = auth('web')->check()
            ? auth('web')->user() // Default 'web' guard
            : (auth('business')->check() ? auth('business')->user() : null); // 'business' guard

        // $profile = auth('web')->check()
        //     ? UserProfile::where('user_id', $request->user()->id)->first() // Default 'web' guard
        //     : (auth('business')->check() ? UserProfile::where('user_id', $request->user()->id)->first() : null);

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $authenticated,
                'profile' => $request->user() ? UserProfile::where('user_id', $request->user()->id)->first() : null,
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
        ]);
    }
}
