<?php

declare(strict_types=1);

namespace Tests\Feature;

use Tests\TestCase;

final class HomePageTest extends TestCase
{
    public function testHomePageReturnsSuccessfulResponse(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
