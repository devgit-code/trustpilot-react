<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RedirectIfBusiness
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is logged in and has the 'admin' role
        if (Auth::guard('business')->check()) {
            return redirect()->route('admin.dashboard')->with('status', "you can't access this page!"); // Redirect admins to the admin dashboard
        }
        return $next($request);
    }
}
