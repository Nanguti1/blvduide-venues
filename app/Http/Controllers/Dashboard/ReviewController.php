<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $reviews = $request->user()
            ->reviews()
            ->with('venue')
            ->latest()
            ->paginate(20);

        return Inertia::render('dashboard/reviews/index', [
            'reviews' => $reviews,
        ]);
    }

    public function store(Request $request, Venue $venue)
    {
        $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['required', 'string', 'max:2000'],
        ]);

        $venue->reviews()->create([
            'user_id' => $request->user()->id,
            'rating' => $request->integer('rating'),
            'comment' => $request->string('comment'),
        ]);

        return back()->with('success', 'Review submitted and will be reviewed by our moderation team.');
    }
}
