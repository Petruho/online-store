# Online Store

Учебный интернет-магазин. Стек: PHP 8.4, Laravel, Inertia + React + TypeScript + Tailwind, PostgreSQL, Redis, Docker.

Локально PHP, Composer и Node ставить не нужно — всё через Docker и Make.

## Быстрый старт

```bash
cp .env.example .env
make build
make install
docker compose exec app php artisan key:generate
make migrate
