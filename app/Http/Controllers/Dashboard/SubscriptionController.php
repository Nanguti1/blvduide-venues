<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\SubscriptionService;

class SubscriptionController extends Controller
{
    public function index(Request $request)
    {
        $subscriptions = $this->user()->subscriptions()->with('package')->latest()->get();

        return Inertia::render('dashboard/subscriptions/index', [
            'subscriptions' => $subscriptions,
        ]);
    }

    public function show(Subscription $subscription)
    {
        return Inertia::render('dashboard/subscriptions/show', [
            'subscription' => $subscription->load('package'),
        ]);
    }

    public function store(Request $request, SubscriptionService $service)
    {
        $request->validate(['package_id' => ['required', 'exists:packages,id']]);

        $package = Package::findOrFail($request->input('package_id'));

        $subscription = $service->assignPackage($this->user(), $package, null, \App\Enums\PaymentStatus::Pending);

        return redirect()->route('dashboard.subscriptions.show', $subscription->id)->with('success', 'Subscription created (pending).');
    }

    public function activate(Subscription $subscription, Request $request, SubscriptionService $service)
    {
        $this->authorize('manage', $subscription);

        $service->assignPackage($subscription->user, $subscription->package, $request->input('transaction_reference'), \App\Enums\PaymentStatus::Completed);

        return back()->with('success', 'Subscription activated.');
    }
}
