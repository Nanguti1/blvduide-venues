<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Venue;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['q', 'status', 'rating']);

        $reviews = $request->user()
            ->reviews()
            ->with('venue')
            ->when($filters['q'] ?? null, function ($q, string $term): void {
                $q->where(function ($query) use ($term): void {
                    $query->where('comment', 'like', '%'.$term.'%')
                        ->orWhereHas('venue', fn (Builder $venue) => $venue->where('title', 'like', '%'.$term.'%'));
                });
            })
            ->when($filters['status'] ?? null, fn ($q, string $status) => $q->where('status', $status))
            ->when($filters['rating'] ?? null, fn ($q, string $rating) => $q->where('rating', $rating))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('dashboard/reviews/index', [
            'reviews' => $reviews,
            'filters' => $filters,
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
