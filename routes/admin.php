<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\PasswordResetLinkController;

use App\Http\Controllers\Business\DashboardController;
use App\Http\Controllers\Business\ReviewController;
use App\Http\Controllers\Business\ProductController;
use App\Http\Controllers\Business\ProfileController;
use App\Http\Controllers\Business\CategoryController;

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\CityController;
use App\Http\Controllers\Admin\ClassifiedAdController;
use App\Http\Controllers\Admin\BusinessController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\SponsorController;
use App\Http\Controllers\Admin\StateController;
use App\Http\Controllers\Admin\SubCategoryController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// business
Route::group([
    'prefix' => 'admin',
    'middleware' => ['user-guest', 'business.guest'],
    'as' => 'admin.'
], function () {

    Route::get('/register', [RegisteredUserController::class, 'admin_create'])
            ->name('register');

    Route::post('/register', [RegisteredUserController::class, 'admin_store']);

    Route::get('/login', [AuthenticatedSessionController::class, 'admin_create'])->name('login');

    Route::post('/login', [AuthenticatedSessionController::class, 'admin_store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'admin_create'])
                ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'admin_store'])
                ->name('password.email');
});

Route::group([
    'prefix' => 'admin',
    'middleware' => ['user-guest', 'business.authed'],
    'as' => 'admin.'
], function () {

    Route::get('verify-email', [EmailVerificationPromptController::class, 'admin_create'])->name('verification.notice');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'admin_store'])
                ->middleware('throttle:6,1')
                ->name('verification.send');

    Route::get('verify-email/{id}/{hash}', [VerifyEmailController::class, 'admin_create'])
                ->middleware(['signed', 'throttle:6,1'])
                ->name('verification.verify');

    Route::post('logout', [AuthenticatedSessionController::class, 'admin_destroy'])
                ->name('logout');

});


Route::group([
    'namespace' => 'App\Http\Controllers\Business',
    'prefix' => 'business',
    'middleware' => ['user-guest', 'business.authed', 'business.verified'],
    'as' => 'business.'
], function () {
    Route::get('/', function(){
        return redirect()->route('admin.login');
    });
    //for owner
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('products', ProductController::class);
    Route::resource('reviews', ReviewController::class);
    Route::resource('categories', CategoryController::class);

    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile/logo', [ProfileController::class, 'logo'])->name('profile.logo');
    Route::put('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/update/home', [ProfileController::class, 'home'])->name('profile.update.home');
    Route::put('/profile/update/account', [ProfileController::class, 'account'])->name('profile.update.account');
    Route::put('/profile/update/contact', [ProfileController::class, 'contact'])->name('profile.update.contact');
    Route::post('/profile/update/logo', [ProfileController::class, 'logo_update'])->name('profile.update.logo');


});

Route::group([
    'namespace' => 'App\Http\Controllers\Admin',
    'prefix' => 'admin',
    'middleware' => ['user-guest', 'business.authed', 'business.verified'],
    'as' => 'admin.'
], function () {
    Route::get('/', function(){
        return redirect()->route('admin.login');
    });
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::resource('businesses', BusinessController::class);

    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('users/roles/{id}', [UserController::class, 'userRoles'])->name('users.roles');
    Route::post('users/save-roles', [UserController::class, 'saveRole'])->name('userRoles.save');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
    Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    Route::get('/slides/sort', [SliderController::class, 'sort'])->name('slides.sort');
    Route::post('/slides/updateOrder', [SliderController::class, 'updateOrder'])->name('slides.updateOrder');
    Route::resource('slides', SliderController::class);
    Route::get('/testimonials/sort', [TestimonialController::class, 'sort'])->name('testimonials.sort');
    Route::post('/testimonials/updateOrder', [TestimonialController::class, 'updateOrder'])->name('testimonials.updateOrder');
    Route::resource('/testimonials', TestimonialController::class);
    Route::get('/sponsors/sort', [SponsorController::class, 'sort'])->name('sponsors.sort');
    Route::post('/sponsors/updateOrder', [SponsorController::class, 'updateOrder'])->name('sponsors.updateOrder');
    Route::resource('/sponsors', SponsorController::class);

    Route::get('/user/profile/show', [UserProfileController::class, 'show'])->name('user_profile.show');
    Route::patch('/user/profile/update', [UserProfileController::class, 'update'])->name('user_profile.update');

    Route::get('/categories', [AdminCategoryController::class, 'index'])->name('categories.index');
    Route::get('/categories/create', [AdminCategoryController::class, 'create'])->name('categories.create');
    Route::post('/categories', [AdminCategoryController::class, 'store'])->name('categories.store');
    Route::get('/categories/{category}/edit', [AdminCategoryController::class, 'edit'])->name('categories.edit');
    Route::put('/categories/{category}', [AdminCategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [AdminCategoryController::class, 'destroy'])->name('categories.destroy');

    Route::resource('classifiedAds', ClassifiedAdController::class);
    Route::get('/sub_categories/category/{id}', [SubCategoryController::class, 'index'])->name('sub_categories.index');
    Route::get('/sub_categories/category/{id}/create', [SubCategoryController::class, 'create'])->name('sub_categories.create');
    Route::post('/sub_categories', [SubCategoryController::class, 'store'])->name('sub_categories.store');
    Route::get('/sub_categories/category/{id}/edit', [SubCategoryController::class, 'edit'])->name('sub_categories.edit');
    Route::put('/sub_categories/category/{id}', [SubCategoryController::class, 'update'])->name('sub_categories.update');
    Route::delete('/sub_categories/{sub_category}', [SubCategoryController::class, 'destroy'])->name('sub_categories.destroy');

});
