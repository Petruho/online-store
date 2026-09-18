# .PHONY говорит make, что это не имена файлов, а просто команды —
.PHONY: up down build migrate shell logs test

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
	docker compose logs -f app web

test:
	docker compose exec app php artisan test
