<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\SalesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
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

Route::get('/', function () {
    return Inertia::render('Welcome');
});
    
Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');

Route::get('/terms', function () {
    return Inertia::render('Legal/Terms');
})->name('terms');

Route::get('/privacy', function () {
    return Inertia::render('Legal/Privacy');
})->name('privacy');

Route::get('/p/{slug}', [SalesController::class, 'show'])->name('sales.preview');


// Authenticated only
Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('/dashboard', [SalesController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/projects', [SalesController::class, 'projects'])->name('dashboard.projects');
    Route::post('/sales/generate', [SalesController::class, 'generate'])->name('sales.generate');

    Route::delete('/sales/{sales}', [SalesController::class, 'destroy'])->name('sales.destroy');
    Route::post('/sales', [SalesController::class, 'store'])->name('sales.store');

    Route::get('/dashboard/ai-generator', function () {
        return Inertia::render('Dashboard/AiGenerator');
    })->name('dashboard.ai-generator');

    Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [\App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [\App\Http\Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');

});

require __DIR__.'/auth.php';
