<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckSessionExpiration
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is logged in and the session is expired
        if (Auth::guard('business')->check() || Auth::check() && !$request->session()->has('_token')) {
            // Log the user out
            Auth::logout();

            // Invalidate and regenerate session
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            // Redirect to login with an error message
            // Redirect based on the URL
            if ($request->is('admin/*')) {
                // Redirect to admin login
                return redirect()->route('yonetici.login');
            }

            return redirect()->route('login');
        }

        return $next($request);
    }
}
