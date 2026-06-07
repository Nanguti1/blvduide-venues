<?php

use App\Http\Controllers\Dashboard\FavoriteController;
use App\Http\Controllers\Dashboard\PackageController;
use App\Http\Controllers\Dashboard\ReviewController;
use App\Http\Controllers\Dashboard\ReviewModerationController;
use App\Http\Controllers\Dashboard\SubscriptionController;
use App\Http\Controllers\Dashboard\VenueApprovalController;
use App\Http\Controllers\Dashboard\VenueController as DashboardVenueController;
use App\Http\Controllers\Public\VenueController as PublicVenueController;
use Illuminate\Support\Facades\Route;

Route::get('venues', [PublicVenueController::class, 'index'])->name('venues.index');
Route::get('venues/categories/{category:slug}', [PublicVenueController::class, 'category'])->name('venues.categories.show');
Route::get('venues/locations/{locale:slug}', [PublicVenueController::class, 'locale'])->name('venues.locales.show');
Route::get('venues/{venue:slug}', [PublicVenueController::class, 'show'])->name('venues.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('venues/{venue}/reviews', [ReviewController::class, 'store'])->name('venues.reviews.store');
    Route::post('venues/{venue}/favorite', [FavoriteController::class, 'toggle'])->name('venues.favorite.toggle');

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::delete('venues/bulk-delete', [DashboardVenueController::class, 'bulkDestroy'])->name('venues.bulk-destroy');
        Route::resource('venues', DashboardVenueController::class)->except(['show']);
        Route::patch('venues/{venue}/submit', [DashboardVenueController::class, 'submitForApproval'])->name('venues.submit');

        Route::get('favorites', [FavoriteController::class, 'index'])->name('favorites.index');
        Route::post('favorites/{venue}', [FavoriteController::class, 'toggle'])->name('favorites.toggle');

        Route::get('reviews', [ReviewController::class, 'index'])->name('reviews.index');

        Route::middleware(['can:venues.approve'])->group(function () {
            Route::get('approvals', [VenueApprovalController::class, 'index'])->name('approvals.index');
            Route::patch('approvals/{venue}/approve', [VenueApprovalController::class, 'approve'])->name('approvals.approve');
            Route::patch('approvals/{venue}/reject', [VenueApprovalController::class, 'reject'])->name('approvals.reject');
        });

        Route::middleware(['can:reviews.moderate'])->group(function () {
            Route::get('admin/reviews', [ReviewModerationController::class, 'index'])->name('admin.reviews.index');
            Route::patch('admin/reviews/{review}/approve', [ReviewModerationController::class, 'approve'])->name('admin.reviews.approve');
            Route::patch('admin/reviews/{review}/reject', [ReviewModerationController::class, 'reject'])->name('admin.reviews.reject');
        });

        Route::middleware(['can:packages.manage'])->group(function () {
            Route::resource('packages', PackageController::class);
        });

        Route::resource('subscriptions', SubscriptionController::class)->only(['index', 'show', 'store']);
        Route::post('subscriptions/{subscription}/activate', [SubscriptionController::class, 'activate'])->name('subscriptions.activate')->middleware('can:subscriptions.manage');
    });
});
