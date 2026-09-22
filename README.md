# Online Store

Учебный pet-проект: интернет-магазин уровня коммерческого — Laravel + Inertia + React + TypeScript + Tailwind, полностью в Docker.

## Стек

- PHP 8.4, Laravel 13, строгая типизация
- Inertia + React 19 + TypeScript strict + Tailwind 4, сборка Vite
- PostgreSQL 16, Redis 7
- Docker Compose, Makefile
- GitLab CI/CD

## Требования

Нужен только Docker и Docker Compose. PHP, Composer и Node на компьютер ставить не нужно — всё запускается в контейнерах.

## Как поднять проект

```bash
git clone git@gitlab.com:Perfla/online-store.git
cd online-store
cp .env.example .env
make build
make migrate
```

После этого:
- **http://localhost:8000** — сайт
- **http://localhost:5173** — Vite dev-сервер (hot reload при разработке фронтенда)

## Команды (через Makefile)

| Команда | Что делает |
|---|---|
| `make up` | Поднять контейнеры |
| `make down` | Остановить контейнеры |
| `make build` | Пересобрать образы и поднять |
| `make migrate` | Прогнать миграции |
| `make shell` | Зайти в контейнер `app` |
| `make logs` | Смотреть логи `app` + `web` |
| `make test` | Запустить тесты (Pest) |

## Проверки кода

Локально — теми же командами, что и в CI:

```bash
docker compose exec app vendor/bin/phpcs                  # стиль кода, PSR-12
docker compose exec app vendor/bin/phpstan analyse         # статический анализ (Larastan)
docker compose exec app php artisan test                   # тесты (Pest)

docker run --rm -u $(id -u):$(id -g) -e HOME=/tmp -v $(pwd)/frontend:/app -w /app node:22-alpine npm run typecheck
docker run --rm -u $(id -u):$(id -g) -e HOME=/tmp -v $(pwd)/frontend:/app -w /app node:22-alpine npm run lint
```

## CI/CD

На каждый push в ветку с открытым MR в GitLab CI запускаются четыре проверки: `phpcs`, `phpstan`, `pest`, `frontend` (typecheck + lint + build). Все они блокирующие — MR нельзя влить в `main`, пока пайплайн не зелёный. Каждый MR дополнительно проходит проверку у преподавателя перед мёржем.

Задание `pest` использует собранный фронтенд из задания `frontend` (передаётся через GitLab CI artifacts) — Inertia-страницы рендерятся и в тестах, не только в браузере.

## Структура проекта
