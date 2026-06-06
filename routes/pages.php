<?php

use App\Http\Controllers\Public\PageController;
use Illuminate\Support\Facades\Route;

Route::get('about', [PageController::class, 'about'])->name('about');
Route::get('contact', [PageController::class, 'contact'])->name('contact');
