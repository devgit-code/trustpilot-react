<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\WebReviewController;
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
    'middleware' => ['business.guest'],
], function(){

    Route::get('/', [HomeController::class, 'index'])
        ->name('home');

    // category
    Route::get('/search', [CategoryController::class, 'search'])
        ->name('search');

    Route::get('/categories', [CategoryController::class, 'index'])
        ->name('categories.index');

    Route::get('/categories/{category}', [CategoryController::class, 'show'])
        ->name('categories.show');

    Route::get('/categories/{sub_category}/detail', [CategoryController::class, 'detail'])
        ->name('categories.detail');


    // reviews
    Route::get('/writeareview', [WebReviewController::class, 'write'])
        ->name('reviews.write');

    Route::get('/reviews/evaluate/{company}', [WebReviewController::class, 'evaluate'])
        ->name('reviews.evaluate');

    Route::get('/reviews/company/{id}', [WebReviewController::class, 'company'])
        ->name('reviews.company');

    Route::get('/reviews/user/{id}', [WebReviewController::class, 'user'])
        ->name('reviews.user');

    Route::get('/reviews/review/{id}', [WebReviewController::class, 'detail'])
        ->name('reviews.detail');


    // blogs
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


Route::group([
    'middleware' => ['auth', 'business.guest'],
], function(){
    Route::post('/reviews', [WebReviewController::class, 'store'])
        ->name('reviews.store');

});
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
