<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\User;
use App\Models\Business;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        if (Business::get()->count() == 0) {
            // User::create(array('name' => 'Administrator', 'email' => 'admin@test.com', 'email_verified_at' => Carbon::now(), 'password' => Hash::make('root1234'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()));
            Business::create(array('website' => 'https://test.com', 'role' => 'admin', 'company_name' => 'Test', 'first_name' => 'Admin', 'last_name' => 'D', 'job_title' => 'Admin', 'company_email' => 'test@superadmin.com', 'email_verified_at' => Carbon::now(), 'password' => Hash::make('root1234'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()));

            // Permission::create(['name' => 'Post access', 'guard_name' => 'business']);
            // Permission::create(['name' => 'Post edit', 'guard_name' => 'business']);
            // Permission::create(['name' => 'Post create', 'guard_name' => 'business']);
            // Permission::create(['name' => 'Post delete', 'guard_name' => 'business']);

            // Permission::create(['name' => 'Role access', 'guard_name' => 'business']);
            // Permission::create(['name' => 'Role edit', 'guard_name' => 'business']);
            // Permission::create(['name' => 'Role create', 'guard_name' => 'business']);
            // Permission::create(['name' => 'Role delete', 'guard_name' => 'business']);

            // Permission::create(['name' => 'User access', 'guard_name' => 'business']);
            // Permission::create(['name' => 'User edit', 'guard_name' => 'business']);
            // Permission::create(['name' => 'User create', 'guard_name' => 'business']);
            // Permission::create(['name' => 'User delete', 'guard_name' => 'business']);

            // Permission::create(['name' => 'Permission access', 'guard_name' => 'business']);
            // Permission::create(['name' => 'Permission edit', 'guard_name' => 'business']);
            // Permission::create(['name' => 'Permission create', 'guard_name' => 'business']);
            // Permission::create(['name' => 'Permission delete', 'guard_name' => 'business']);

            // $adminRole = Role::create(['name' => 'Admin', 'guard_name' => 'business']);
            // $adminRole->syncPermissions(Permission::all());

            // $ownerRole = Role::create(['name' => 'Owner', 'guard_name' => 'business']);
            // $ownerRole->syncPermissions(Permission::where('name', 'LIKE', 'Post%')->get());

            // $userRole = Role::create(['name' => 'User']);

            // $user = User::first();
            // $user->assignRole($adminRole);
        } else {
            echo "Table is not empty";
        }
    }
}
