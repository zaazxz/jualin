# ─── Stage 1: Node build (Vite/React assets) ──────────────────────────────────
FROM node:20-alpine AS node-builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ─── Stage 2: PHP application ─────────────────────────────────────────────────
FROM php:8.2-cli

# System dependencies required by common Laravel extensions
RUN apt-get update && apt-get install -y --no-install-recommends \
        libzip-dev \
        libcurl4-openssl-dev \
        libxml2-dev \
        libonig-dev \
        libssl-dev \
        zip \
        unzip \
        git \
        curl \
    && docker-php-ext-install \
        pdo \
        pdo_mysql \
        mbstring \
        tokenizer \
        xml \
        ctype \
        fileinfo \
        curl \
        zip \
        bcmath \
        opcache \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Install PHP dependencies (production only)
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# Copy application source
COPY . .

# Copy compiled frontend assets from the node-builder stage
COPY --from=node-builder /app/public/build ./public/build

# Laravel bootstrap
RUN php artisan storage:link --force \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

EXPOSE 8080

# Run migrations then start the built-in server.
# APP_KEY must be set as a Railway environment variable.
CMD php artisan migrate --force \
    && php artisan db:seed --force --class=DatabaseSeeder 2>/dev/null || true \
    && php artisan serve --host=0.0.0.0 --port=${PORT:-8080}
