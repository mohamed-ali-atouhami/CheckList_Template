<?php

use App\Http\Controllers\LineController;
use App\Http\Controllers\ShiftController;
use App\Http\Controllers\StationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware(['auth:sanctum','ability:user,admin'])->group(static function() {
    Route::get('/me', function (Request $request) {
        return $request->user();
    });
});
Route::middleware(['auth:sanctum','ability:user'])->prefix('user')->group(static function() {
    
});
Route::middleware(['auth:sanctum','ability:admin'])->prefix('admin')->group(static function() {
    Route::apiResources([
        'shifts' => ShiftController::class,
        'lines' => LineController::class,
        'stations' => StationController::class,
        'users' => UserController::class,
    ]);
});

require __DIR__.'/auth.php';