<?php

use App\Http\Controllers\Agent\VenueController as AgentVenueController;
use App\Http\Controllers\Public\VenueController as PublicVenueController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::prefix('venues')->name('venues.')->group(function (): void {
    Route::get('/', [PublicVenueController::class, 'index'])->name('index');
    Route::get('/{venue:slug}', [PublicVenueController::class, 'show'])->name('show');
});

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::prefix('agent')->name('agent.')->group(function (): void {
        Route::resource('venues', AgentVenueController::class)
            ->only(['index', 'create', 'store', 'edit', 'update']);
    });
});

require __DIR__.'/settings.php';
