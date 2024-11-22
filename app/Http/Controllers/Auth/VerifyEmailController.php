<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function create(EmailVerificationRequest $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(RouteServiceProvider::HOME.'?verified=1');
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return redirect(RouteServiceProvider::HOME);
    }

    public function admin_create(Request $request): RedirectResponse
    {
        if (Auth::guard('business')->check() && Auth::guard('business')->user()->email_verified_at) {
            return redirect()->route('admin.dashboard');
        }
logger('here is verifyemailcontroller' . Auth::guard('business')->user());
        if (Auth::guard('business')->user()->markEmailAsVerified()) {
            return redirect()->route('admin.verification.notice');
        }

        return redirect()->route('admin.dashboard');

    }
}
