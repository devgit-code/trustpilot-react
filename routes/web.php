<?php


use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
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


Route::get('/clear-cache', function () {
	Artisan::call('cache:clear');
	Artisan::call('config:clear');
	Artisan::call('config:cache');
	Artisan::call('view:clear');
	Artisan::call('route:clear');
	Artisan::call('optimize');

	return "Cache is cleared";
});

Route::get('/', function () {
    return Inertia::render('Welcome/Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/categories', function(){
    return Inertia::render('Category/Index');
});

Route::get('/categories/{category_name}', function(){
    return Inertia::render('Category/Detail');
});

Route::get('/categories/{category_name}/{sub_cat}', function(){
    return Inertia::render('Category/SubCat');
});

Route::get('/writeareview', function(){
    return Inertia::render('Review/Index');
});

Route::get('/evaluate/{company_name}', function(){
    return Inertia::render('Review/Evaluate');
});

Route::get('/review/{company_name}', function(){
    return Inertia::render('Review/Reviews');
});

Route::get('/test', function (Request $request) {
            return $request->user()->hasVerifiedEmail();

})->name('test');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/user/profile/show', [UserProfileController::class, 'show'])->name('user_profile.show');
    Route::patch('/user/profile/update', [UserProfileController::class, 'update'])->name('user_profile.update');
});



require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
