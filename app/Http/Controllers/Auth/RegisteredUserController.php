<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Business;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        // return redirect(RouteServiceProvider::HOME);
        return redirect()->route('verification.notice');;
    }

    public function admin_create(): Response
    {
        return Inertia::render('Admin/Auth/Register');
    }

    public function admin_store(Request $request): RedirectResponse
    {
        $request->validate([
            'website' => 'required|url|unique:'.Business::class,
            'company_name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'job_title' => 'required|string|max:255',
            'company_email' => 'required|string|email|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $business = Business::create([
            'website' => $request->website,
            'company_name' => $request->company_name,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'job_title' => $request->job_title,
            'company_email' => $request->company_email,
            'password' => Hash::make($request->password),
        ]);

        // event(new Registered($business));
        Auth::guard('business')->login($business);
        // $request->session()->regenerate();

        $business->sendEmailVerificationNotification();

        // return redirect(RouteServiceProvider::HOME);
        return redirect()->route('admin.verification.notice');
    }

    public function admin_claim(): Response
    {
        $businesses = Business::where('email_verified_at', null)->select('id', 'website')->get();

        return Inertia::render('Admin/Auth/Claim', compact('businesses'));
    }

    public function admin_claim_store(Request $request)
    {
        $business = Business::findOrFail($request->input('id'));
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'job_title' => 'required|string|max:255',
            'company_email' => 'required|string|email|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // $business->fill($validated);
        $business->name = $request->input('name');
        $business->save();

        // event(new Registered($business));
        Auth::guard('business')->login($business);
        // $request->session()->regenerate();

        $business->sendEmailVerificationNotification();

        // return redirect(RouteServiceProvider::HOME);
        return redirect()->route('admin.verification.notice');

    }
}
