<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(RouteServiceProvider::HOME);
        }

        $request->user()->sendEmailVerificationNotification();

        return back()->with('status', 'verification-link-sent');
    }

    public function admin_store(Request $request): RedirectResponse
    {
        if(!Auth::guard('business')->check() && !Auth::guard('business')->user()->email_verified_at){
            return redirect()->route('admin.login');
        }

        Auth::guard('business')->user()->sendEmailVerificationNotification();

        return redirect()->route('verification.notice', ['status', 'verification-link-sent']);
    }
}
