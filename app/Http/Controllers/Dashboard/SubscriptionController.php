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

    public function activate(Subscription $subscription, Request $request, SubscriptionService $service)
    {
        $this->authorize('manage', $subscription);

        $service->assignPackage($subscription->user, $subscription->package, $request->input('transaction_reference'), PaymentStatus::Completed);

        return back()->with('success', 'Subscription activated.');
    }
}
