<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
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

Route::get('/up', function () {
    return response()->noContent();
});

// Rute darurat buat ngetes email (Hapus kalau sudah beres)
Route::get('/', function () {
    return Inertia::render('Welcome');
});
    
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
    Route::get('/dashboard/analytics/{sales?}', [SalesController::class, 'analytics'])->name('dashboard.analytics');
    Route::post('/sales/generate', [SalesController::class, 'generate'])->name('sales.generate');
    Route::post('/sales/daily-insight', [SalesController::class, 'dailyInsight'])->name('sales.insight');

    Route::delete('/sales/{sales}', [SalesController::class, 'destroy'])->name('sales.destroy');
    Route::post('/sales', [SalesController::class, 'store'])->name('sales.store');
    Route::put('/sales/{sales}', [SalesController::class, 'update'])->name('sales.update');

    Route::get('/dashboard/ai-generator/{sales?}', function (\App\Models\Sales $sales = null) {
        if ($sales && $sales->user_id !== auth()->id()) abort(403);
        if ($sales && $sales->status === 'published') return redirect()->route('dashboard.projects')->withErrors(['message' => 'Proyek yang sudah dipublikasikan tidak dapat diedit.']);
        $salesCount = \App\Models\Sales::where('user_id', auth()->id())->count();
        return Inertia::render('Dashboard/AiGenerator', [
            'edit_sales' => $sales,
            'sales_count' => $salesCount
        ]);
    })->name('dashboard.ai-generator');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/api/check-api-status', [ProfileController::class, 'checkApiStatus'])->name('api.check-status');

});

require __DIR__.'/auth.php';
