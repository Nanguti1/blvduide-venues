<?php

use App\Http\Controllers\Dashboard\FavoriteController;
use App\Http\Controllers\Dashboard\PackageController;
use App\Http\Controllers\Dashboard\ReviewController;
use App\Http\Controllers\Dashboard\SubscriptionController;
use App\Http\Controllers\Dashboard\VenueController as DashboardVenueController;
use App\Http\Controllers\Public\VenueController as PublicVenueController;
use Illuminate\Support\Facades\Route;

Route::get('venues', [PublicVenueController::class, 'index'])->name('venues.index');
Route::get('venues/categories/{category:slug}', [PublicVenueController::class, 'category'])->name('venues.categories.show');
Route::get('venues/locations/{locale:slug}', [PublicVenueController::class, 'locale'])->name('venues.locales.show');
Route::get('venues/{venue:slug}', [PublicVenueController::class, 'show'])->name('venues.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::resource('venues', DashboardVenueController::class)->except(['show']);
        Route::patch('venues/{venue}/submit', [DashboardVenueController::class, 'submitForApproval'])->name('venues.submit');

        Route::get('favorites', [FavoriteController::class, 'index'])->name('favorites.index');
        Route::post('favorites/{venue}', [FavoriteController::class, 'toggle'])->name('favorites.toggle');

        Route::get('reviews', [ReviewController::class, 'index'])->name('reviews.index');

        Route::middleware(['can:packages.manage'])->group(function () {
            Route::resource('packages', PackageController::class);
        });
        Route::resource('subscriptions', SubscriptionController::class)->only(['index', 'show', 'store']);
        Route::post('subscriptions/{subscription}/activate', [SubscriptionController::class, 'activate'])->name('subscriptions.activate')->middleware('can:packages.manage');
    });
});
