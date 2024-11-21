<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function create(Request $request): RedirectResponse|Response
    {
        return $request->user()->hasVerifiedEmail()
                    ? redirect()->intended(RouteServiceProvider::HOME)
                    : Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
    }

    public function admin_create(Request $request): RedirectResponse|Response
    {
        if(!Auth::guard('business')->check() && !Auth::guard('business')->user()->email_verified_at){
            return Inertia::render('Admin/Auth/VerifyEmail', ['email' => session('email')]);
        }

        return redirect()->route('admin.dashboard');
    }
}
