<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\PaymentStatus;
use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\Subscription;
use Illuminate\Database\Eloquent\Builder;
use App\Services\SubscriptionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['q', 'status', 'payment_status', 'date_from', 'date_to']);

        $subscriptions = $request->user()->subscriptions()
            ->with('package')
            ->when($filters['q'] ?? null, function ($q, string $term): void {
                $q->where(function ($query) use ($term): void {
                    $query->where('transaction_reference', 'like', '%'.$term.'%')
                        ->orWhereHas('package', fn (Builder $package) => $package->where('name', 'like', '%'.$term.'%'));
                });
            })
            ->when($filters['status'] ?? null, fn ($q, string $status) => $q->where('status', $status))
            ->when($filters['payment_status'] ?? null, fn ($q, string $status) => $q->where('payment_status', $status))
            ->when($filters['date_from'] ?? null, fn ($q, string $date) => $q->whereDate('starts_at', '>=', $date))
            ->when($filters['date_to'] ?? null, fn ($q, string $date) => $q->whereDate('starts_at', '<=', $date))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('dashboard/subscriptions/index', [
            'subscriptions' => $subscriptions,
            'filters' => $filters,
        ]);
    }

    public function show(Subscription $subscription)
    {
        $this->authorize('view', $subscription);

        return Inertia::render('dashboard/subscriptions/show', [
            'subscription' => $subscription->load('package'),
        ]);
    }

    public function store(Request $request, SubscriptionService $service)
    {
        $request->validate(['package_id' => ['required', 'exists:packages,id']]);

        $package = Package::findOrFail($request->input('package_id'));

        $subscription = $service->assignPackage($request->user(), $package, null, PaymentStatus::Pending);

        return redirect()->route('dashboard.subscriptions.show', $subscription->id)->with('success', 'Subscription created (pending).');
    }

    public function activate(Subscription $subscription, Request $request)
    {
        $this->authorize('manage', $subscription);

        $subscription->update([
            'payment_status' => PaymentStatus::Completed,
            'transaction_reference' => $request->input('transaction_reference', $subscription->transaction_reference),
            'status' => \App\Enums\SubscriptionStatus::Active,
            'starts_at' => now(),
            'expires_at' => now()->addDays($subscription->package->duration_days),
        ]);

        return back()->with('success', 'Subscription activated.');
    }
}
