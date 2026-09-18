# Базовый образ: PHP 8.4 с FPM (FastCGI Process Manager — то, что понимает nginx)
FROM php:8.4-fpm-alpine AS base

# Ставим системные библиотеки, нужные для сборки PHP-расширений ниже
# (postgresql-dev — заголовки для pdo_pgsql, icu-dev — для intl, и т.д.)
RUN apk add --no-cache \
    postgresql-dev \
    icu-dev \
    oniguruma-dev \
    libzip-dev \
    $PHPIZE_DEPS

# Ставим PHP-расширения, которые нужны Laravel + Postgres + Redis
RUN docker-php-ext-install pdo pdo_pgsql intl mbstring zip bcmath \
    && pecl install redis \
    && docker-php-ext-enable redis

# Composer не переустанавливаем через apt — копируем готовый бинарник
# из официального образа composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
