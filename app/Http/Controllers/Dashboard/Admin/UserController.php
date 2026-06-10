<?php

namespace App\Http\Controllers\Dashboard\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['q', 'status', 'role']);

        $users = User::query()
            ->with('roles:id,name')
            ->when($filters['q'] ?? null, function ($query, string $term): void {
                $query->where(function ($query) use ($term): void {
                    $query->where('name', 'like', '%'.$term.'%')
                        ->orWhere('email', 'like', '%'.$term.'%')
                        ->orWhere('phone', 'like', '%'.$term.'%');
                });
            })
            ->when($filters['status'] ?? null, fn ($query, string $status) => $query->where('status', $status))
            ->when($filters['role'] ?? null, fn ($query, string $role) => $query->role($role))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('dashboard/admin/users/index', [
            'users' => $users,
            'filters' => $filters,
            'roles' => $this->roles(),
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/admin/users/create', [
            'roles' => $this->roles(),
            'statuses' => $this->statuses(),
        ]);
    }

    public function store(Request $request)
    {
        $attributes = $request->validate($this->rules());

        $role = $attributes['role'];
        unset($attributes['role']);
        $attributes['password'] = Hash::make($attributes['password']);

        $user = User::create($attributes);
        $user->syncRoles([$role]);

        return redirect()->route('dashboard.admin.users.index')->with('toast', [
            'type' => 'success',
            'message' => 'User created successfully.',
        ]);
    }

    public function show(User $user)
    {
        return Inertia::render('dashboard/admin/users/show', [
            'managedUser' => $user->load('roles:id,name'),
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('dashboard/admin/users/edit', [
            'managedUser' => $user->load('roles:id,name'),
            'roles' => $this->roles(),
            'statuses' => $this->statuses(),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $attributes = $request->validate($this->rules($user));

        $role = $attributes['role'];
        unset($attributes['role']);

        if (blank($attributes['password'] ?? null)) {
            unset($attributes['password']);
        } else {
            $attributes['password'] = Hash::make($attributes['password']);
        }

        $user->update($attributes);
        $user->syncRoles([$role]);

        return redirect()->route('dashboard.admin.users.index')->with('toast', [
            'type' => 'success',
            'message' => 'User updated successfully.',
        ]);
    }

    public function destroy(Request $request, User $user)
    {
        if ($request->user()->is($user)) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You cannot delete your own account.',
            ]);
        }

        $user->delete();

        return redirect()->route('dashboard.admin.users.index')->with('toast', [
            'type' => 'success',
            'message' => 'User deleted successfully.',
        ]);
    }

    protected function rules(?User $user = null): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user)],
            'phone' => ['nullable', 'string', 'max:50'],
            'role' => ['required', Rule::exists('roles', 'name')->where('guard_name', 'web')],
            'status' => ['required', Rule::in(['active', 'inactive'])],
            'password' => [$user ? 'nullable' : 'required', 'string', 'min:8', 'confirmed'],
        ];
    }

    protected function roles()
    {
        return Role::query()->orderBy('name')->get(['id', 'name']);
    }

    protected function statuses(): array
    {
        return [
            ['label' => 'Active', 'value' => 'active'],
            ['label' => 'Inactive', 'value' => 'inactive'],
        ];
    }
}
