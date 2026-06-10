<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    public function up(): void
    {
        $permission = Permission::findOrCreate('users.manage', 'web');
        Role::findOrCreate('Super Admin', 'web')->givePermissionTo($permission);
    }

    public function down(): void
    {
        $permission = Permission::where('name', 'users.manage')->where('guard_name', 'web')->first();

        if (! $permission) {
            return;
        }

        Role::where('guard_name', 'web')->get()->each(fn (Role $role) => $role->revokePermissionTo($permission));
        $permission->delete();
    }
};
