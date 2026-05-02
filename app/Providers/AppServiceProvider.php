<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Menghilangkan batas waktu 30 detik agar pengiriman email via Gmail tidak timeout
        if (config('app.env') === 'local') {
            set_time_limit(0);
        }
    }
}
