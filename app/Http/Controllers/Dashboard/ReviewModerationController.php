<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewModerationController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('moderate', Review::class);

        $reviews = Review::query()
            ->with(['user', 'venue'])
            ->latest()
            ->paginate(20);

        return Inertia::render('dashboard/admin/reviews/index', [
            'reviews' => $reviews,
        ]);
    }

    public function approve(Review $review)
    {
        $this->authorize('moderate', Review::class);

        $review->update(['status' => \App\Enums\ReviewStatus::Approved->value]);

        return back()->with('success', 'Review approved.');
    }

    public function reject(Review $review)
    {
        $this->authorize('moderate', Review::class);

        $review->update(['status' => \App\Enums\ReviewStatus::Rejected->value]);

        return back()->with('success', 'Review rejected.');
    }
}
