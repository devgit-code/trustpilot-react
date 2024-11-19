<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/test', function (Request $request) {
    return Inertia::render('Auth/Test');
})->name('test');

Route::get('/clear-cache', function () {
	Artisan::call('cache:clear');
	Artisan::call('config:clear');
	Artisan::call('view:clear');
	Artisan::call('route:clear');

	return "Cache is cleared";
});

Route::group([
    'middleware' => ['onlyuser'],
], function(){

    Route::get('/', function () {
        return Inertia::render('Welcome/Index', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    })->name('home');

    Route::get('/search', function(){
        return Inertia::render('Category/Search');
    })->name('search');


    // category
    Route::get('/categories', function(){
        return Inertia::render('Category/Index');
    })->name('categories');

    Route::get('/categories/{category_name}', function(){
        return Inertia::render('Category/Detail', [
            'category_name' => "Animals & Pets"
        ]);
    })->name('categories.detail');

    Route::get('/categories/{category_name}/{sub_cat}', function(){
        return Inertia::render('Category/Detail', [
            'category_name' => "Animals & Pets",
            'sub_cat' => 'Cats & Dogs'
        ]);
    })->name('categories.subcat');


    // reviews
    Route::get('/writeareview', function(){
        return Inertia::render('Review/Index');
    })->name('reviews');

    Route::get('/reviews/evaluate/{company_name}', function(){
        return Inertia::render('Review/Evaluate');
    })->name('reviews.evaluate');

    Route::get('/reviews/company/{id}', function(){
        return Inertia::render('Review/Company');
    })->name('reviews.company');

    Route::get('/reviews/user/{id}', function(){
        return Inertia::render('Review/User');
    })->name('reviews.user');

    Route::get('/reviews/review/{id}', function(){
        return Inertia::render('Review/Detail');
    })->name('reviews.detail');


    // blog
    Route::get('/aboutus', function(){
        return Inertia::render('About/Index');
    })->name('aboutus');

    Route::get('/aboutus/trends-in-trust', function(){
        return Inertia::render('About/BlogCategory', [
            'title' => "Trends in Trust"
        ]);
    })->name('aboutus.trends');

    Route::get('/aboutus/reviews-matter', function(){
        return Inertia::render('About/BlogCategory' ,[
            'title' => "Reviews Matter"
        ]);
    })->name('aboutus.reviews');

    Route::get('/aboutus/{detail}', function(){
        return Inertia::render('About/Detail');
    })->name('aboutus.detail');

});

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/user.php';
