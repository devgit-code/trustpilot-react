<?php

use Illuminate\Support\Facades\Route;

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
use App\Http\Controllers\Admin\BusinessController;
use App\Http\Controllers\Admin\OwnerController;
use App\Http\Controllers\Admin\AdminReviewController;
use App\Http\Controllers\Admin\SubCategoryController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\BlogController;


// admin auth
Route::group([
    'prefix' => 'yonetici',
    'middleware' => ['business.guest'],
    'as' => 'yonetici.'
], function () {

    Route::get('/kayit', [RegisteredUserController::class, 'admin_create']) ->name('register');
    Route::post('/kayit', [RegisteredUserController::class, 'admin_store']);

    Route::get('/giris', [AuthenticatedSessionController::class, 'admin_create'])->name('login');
    Route::post('/giris', [AuthenticatedSessionController::class, 'admin_store']);

    // Route::get('/claim', [RegisteredUserController::class, 'admin_claim'])->name('claim');
    Route::get('/sahibi/{website?}', [RegisteredUserController::class, 'admin_claim'])->name('claim');
    Route::post('/sahibi', [RegisteredUserController::class, 'admin_claim_store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'admin_create'])->name('password.request');
    Route::post('forgot-password', [PasswordResetLinkController::class, 'admin_store'])->name('password.email');
});

Route::group([
    'prefix' => 'yonetici',
    'middleware' => ['user-guest', 'business.authed'],
    'as' => 'yonetici.'
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


//business
Route::group([
    'namespace' => 'App\Http\Controllers\Business',
    'prefix' => 'yonetici',
    'middleware' => ['user-guest', 'business.authed', 'business.verified'],
    'as' => 'yonetici.'
], function () {
    Route::get('/', function(){
        return redirect()->route('yonetici.login');
    });
    //for owner
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('products', ProductController::class);
    Route::post('/products/{id}', [ProductController::class, 'update'])->name('products.update');
    Route::resource('categories', CategoryController::class);
    Route::post('/categories/primary', [CategoryController::class, 'primary'])->name('categories.primary');
    Route::resource('reviews', ReviewController::class);

    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile/edit', [ProfileController::class, 'profile'])->name('profile.edit');
    Route::put('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/update/home', [ProfileController::class, 'home'])->name('profile.update.home');
    Route::put('/profile/update/account', [ProfileController::class, 'account'])->name('profile.update.account');
    Route::post('/profile/update/contact', [ProfileController::class, 'contact'])->name('profile.update.contact');
    Route::post('/profile/update/logo', [ProfileController::class, 'logo_update'])->name('profile.update.logo');

});


//super admin
Route::group([
    'namespace' => 'App\Http\Controllers\Admin',
    'prefix' => 'admin',
    'middleware' => ['user-guest', 'business.authed', 'business.verified', 'admin.authed'],
    'as' => 'admin.'
], function () {
    Route::get('/', function(){
        return redirect()->route('yonetici.login');
    });
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::resource('owners', OwnerController::class);
    Route::post('/owners/approve/{business}/{owner}', [OwnerController::class, 'approve'])->name('owners.approve');
    Route::post('/owners/clear/{business}', [OwnerController::class, 'clear'])->name('owners.clear');
    Route::post('/owners/remove/{owner}', [OwnerController::class, 'removeOwner'])->name('owners.delete');
    Route::resource('businesses', BusinessController::class);
    Route::get('/businesses/{website}', [BusinessController::class, 'show'])->name('businesses.show');
    Route::post('/businesses/create', [BusinessController::class, 'store'])->name('businesses.store');
    Route::post('/businesses/{business}/change', [BusinessController::class, 'change'])->name('businesses.change');
    Route::post('/businesses/{business}/verify', [BusinessController::class, 'verify'])->name('businesses.verify');
    Route::post('/businesses/{business}/approve', [BusinessController::class, 'approve'])->name('businesses.approve');
    Route::post('/businesses/{business}/product', [BusinessController::class, 'productAdd'])->name('businesses.product.add');
    Route::post('/businesses/{business}/product/update/{product}', [BusinessController::class, 'productUpdate'])->name('businesses.product.update');
    Route::post('/businesses/{business}/product/delete/{product}', [BusinessController::class, 'productDelete'])->name('businesses.product.delete');
    Route::post('/businesses/{business}/category', [BusinessController::class, 'categoryAdd'])->name('businesses.category.add');
    Route::delete('/businesses/{business}/category/{category}', [BusinessController::class, 'categoryRemove'])->name('businesses.category.remove');
    Route::post('/businesses/{business}/category/{category}', [BusinessController::class, 'categoryPrimary'])->name('businesses.category.primary');
    Route::resource('reviews', AdminReviewController::class);
    Route::resource('blogs', BlogController::class);
    Route::post('/blogs/{blog}/update', [BlogController::class, 'update'])->name('blogs.update');

    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('users/roles/{id}', [UserController::class, 'userRoles'])->name('users.roles');
    Route::post('users/save-roles', [UserController::class, 'saveRole'])->name('userRoles.save');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
    Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::patch('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    Route::get('/categories', [AdminCategoryController::class, 'index'])->name('categories.index');
    Route::get('/categories/create', [AdminCategoryController::class, 'create'])->name('categories.create');
    Route::post('/categories', [AdminCategoryController::class, 'store'])->name('categories.store');
    Route::get('/categories/{category}/edit', [AdminCategoryController::class, 'edit'])->name('categories.edit');
    Route::post('/categories/{category}', [AdminCategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [AdminCategoryController::class, 'destroy'])->name('categories.destroy');

    Route::get('/sub_categories/category/{id}', [SubCategoryController::class, 'index'])->name('sub_categories.index');
    Route::get('/sub_categories/category/{id}/create', [SubCategoryController::class, 'create'])->name('sub_categories.create');
    Route::post('/sub_categories', [SubCategoryController::class, 'store'])->name('sub_categories.store');
    Route::get('/sub_categories/category/{id}/edit', [SubCategoryController::class, 'edit'])->name('sub_categories.edit');
    Route::post('/sub_categories/category/{id}', [SubCategoryController::class, 'update'])->name('sub_categories.update');
    Route::delete('/sub_categories/{sub_category}', [SubCategoryController::class, 'destroy'])->name('sub_categories.destroy');
    Route::get('/sub_categories/sub_category/{id}/detail', [SubCategoryController::class, 'detail'])->name('sub_categories.detail');

});
