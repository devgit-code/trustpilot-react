<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebReviewController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Business\ReviewController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AdminReviewController;
use App\Http\Controllers\Admin\BusinessController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\HomeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware([])->group(function () {
    Route::get('/home', [HomeController::class, 'apiSearchHome']);
    Route::get('/addcompany', [HomeController::class, 'apiAddCompany']);
    Route::get('/companies', [WebReviewController::class, 'apiSearchCompany']);
    Route::get('/categories', [CategoryController::class, 'apiSearchCategory']);

    Route::get('/reviews/useful', [WebReviewController::class, 'thumbup']);
    Route::get('/reviews/flag', [WebReviewController::class, 'thumbdown']);

    Route::get('/business/reviews', [ReviewController::class, 'apiIndex']);

    Route::get('/admin/reviews', [AdminReviewController::class, 'apiIndex']);
    Route::get('/admin/users', [UserController::class, 'apiIndex']);
    Route::get('/admin/users/{user_id}', [UserController::class, 'apiDetail']);
    Route::get('/admin/businesses', [BusinessController::class, 'apiIndex']);
    Route::get('/admin/businesses/{business_id}', [BusinessController::class, 'apiDetail']);

    Route::post('/admin/blogs', [BlogController::class, 'store']);
});
