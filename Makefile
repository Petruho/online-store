up:
	docker compose up -d

down:
	docker compose down

build:
	docker compose up -d --build

migrate:
	docker compose exec app php artisan migrate

shell:
	docker compose exec app sh

logs:
	docker compose logs -f app web frontend

# зависимости
install: composer-install frontend-install

composer-install:
	docker compose run --rm --no-deps app composer install

frontend-install:
	docker compose run --rm --no-deps frontend sh -c "npm install"

# тесты
test:
	docker compose exec app php artisan test

# проверки кода (то же, что в CI)
phpcs:
	docker compose exec app vendor/bin/phpcs

phpstan:
	docker compose exec app vendor/bin/phpstan analyse --memory-limit=1G

frontend-typecheck:
	docker compose run --rm --no-deps frontend sh -c "npm run typecheck"

frontend-lint:
	docker compose run --rm --no-deps frontend sh -c "npm run lint"

# все обязательные проверки одной командой
check: phpcs phpstan test frontend-typecheck frontend-lint
