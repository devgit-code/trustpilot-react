<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Business\ReviewController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AdminReviewController;

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
    Route::get('/business/reviews', [ReviewController::class, 'apiIndex']);

    Route::get('/admin/users', [UserController::class, 'apiIndex']);
    Route::get('/admin/reviews', [AdminReviewController::class, 'apiIndex']);
});
