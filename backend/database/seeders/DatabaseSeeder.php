<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
//use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         \App\Models\User::factory(10)->create();

         \App\Models\User::factory()->create([
             'name' => 'mohamed ali',
             'email' => 'ali@ali.com',
             'password' => '123456789'
         ]);
         \App\Models\Admin::factory()->create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => '987654321' //Hash::make('987654321'),
        ]);
    }
}
