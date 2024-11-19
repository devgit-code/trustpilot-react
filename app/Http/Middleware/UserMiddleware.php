<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is logged in and has the 'admin' role
        if ($request->user() && !$request->user()->hasRole('User')) {
            return redirect()->route('admin.dashboard')->with('message', "you can't access this page!"); // Redirect admins to the admin dashboard
        }

        return $next($request);
    }
}
