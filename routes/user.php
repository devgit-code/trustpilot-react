<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
//set user personal info
    Route::get('/profile/setting', function(){
        return Inertia::render('Profile/Setting');
    })->name('profile.setting');

});
