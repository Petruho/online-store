<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

final class HandleInertiaRequests extends Middleware
{
    /**
     * Корневой Blade-шаблон (resources/views/app.blade.php).
     */
    protected $rootView = 'app';

    /**
     * Версия ассетов для cache-busting (можно оставить parent).
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Данные, которые уходят на каждую страницу.
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
        ];
    }
}
