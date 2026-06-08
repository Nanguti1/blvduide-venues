<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewModerationController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('moderate', Review::class);

        $filters = $request->only(['q', 'status', 'rating']);

        $reviews = Review::query()
            ->with(['user', 'venue'])
            ->when($filters['q'] ?? null, function ($q, string $term): void {
                $q->where(function ($query) use ($term): void {
                    $query->where('comment', 'like', '%'.$term.'%')
                        ->orWhereHas('venue', fn (Builder $venue) => $venue->where('title', 'like', '%'.$term.'%'))
                        ->orWhereHas('user', fn (Builder $user) => $user->where('name', 'like', '%'.$term.'%')->orWhere('email', 'like', '%'.$term.'%'));
                });
            })
            ->when($filters['status'] ?? null, fn ($q, string $status) => $q->where('status', $status))
            ->when($filters['rating'] ?? null, fn ($q, string $rating) => $q->where('rating', $rating))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('dashboard/admin/reviews/index', [
            'reviews' => $reviews,
            'filters' => $filters,
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
