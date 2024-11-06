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
Route::get('/admin', function () {
    return Inertia::render('Admin/Auth/Login');
})->name('admin');

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

Route::get('/writeareview', function(){
    return Inertia::render('Review/Index');
})->name('reviews.write');

Route::get('/reviews/evaluate/{company_name}', function(){
    return Inertia::render('Review/Evaluate');
})->name('reviews.evaluate');

Route::get('/reviews/{company_name}', function(){
    return Inertia::render('Review/Company');
})->name('reviews.company');

Route::get('/review/{id}', function(){
    return Inertia::render('Review/Detail');
})->name('reviews.detail');

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

Route::get('/contactus', function(){
    return Inertia::render('Contact/Index');
})->name('contactus');




Route::get('/test', function (Request $request) {
            return $request->user()->hasVerifiedEmail();

})->name('test');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/profile/setting', function(){
        return Inertia::render('Profile/Edit');
    })->name('profile.setting');

    Route::get('/profile/password', function(){
        return Inertia::render('Profile/Password');
    })->name('profile.password');

    Route::get('/profile/account', function(){
        return Inertia::render('Profile/Edit');
    })->name('profile.account');

});



require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
