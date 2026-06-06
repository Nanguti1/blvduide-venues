<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\PaymentStatus;
use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\Subscription;
use App\Services\SubscriptionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function index(Request $request)
    {
        $subscriptions = $request->user()->subscriptions()->with('package')->latest()->get();

        return Inertia::render('dashboard/subscriptions/index', [
            'subscriptions' => $subscriptions,
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
