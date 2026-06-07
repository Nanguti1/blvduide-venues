<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\PackageRequest;

class PackageController extends Controller
{
    public function index()
    {
        $packages = Package::orderBy('price')->paginate(20);

        return Inertia::render('dashboard/packages/index', [
            'packages' => $packages,
        ]);
    }

    public function show(Package $package)
    {
        return Inertia::render('dashboard/packages/show', [
            'package' => $package,
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/packages/create');
    }

    public function store(PackageRequest $request)
    {
        $data = $request->validated();
        Package::create($data);

        return redirect()->route('dashboard.packages.index')->with('success', 'Package created.');
    }

    public function edit(Package $package)
    {
        return Inertia::render('dashboard/packages/edit', [
            'package' => $package,
        ]);
    }

    public function update(PackageRequest $request, Package $package)
    {
        $package->update($request->validated());

        return redirect()->route('dashboard.packages.index')->with('success', 'Package updated.');
    }

    public function destroy(Package $package)
    {
        $package->delete();

        return redirect()->route('dashboard.packages.index')->with('success', 'Package removed.');
    }
}
