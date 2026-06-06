<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PageController extends Controller
{
    public function about()
    {
        return Inertia::render('about');
    }

    public function contact()
    {
        return Inertia::render('contact');
    }
}
