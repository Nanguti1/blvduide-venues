<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'venues.view-any', 'venues.view-own', 'venues.create', 'venues.update-own', 'venues.delete-own',
            'venues.approve', 'packages.manage', 'subscriptions.manage', 'locations.manage', 'reviews.moderate',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission, 'web');
        }

        $superAdmin = Role::findOrCreate('Super Admin', 'web');
        $agent = Role::findOrCreate('Agent', 'web');

        $superAdmin->syncPermissions(Permission::all());
        $agent->syncPermissions([
            'venues.view-own', 'venues.create', 'venues.update-own', 'venues.delete-own',
        ]);
    }
}
