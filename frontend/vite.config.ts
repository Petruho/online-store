import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        laravel({
            // входной файл, относительно этой же папки (frontend/)
            input: ['app.tsx'],
            // куда физически положить собранные файлы — наружу, в public/ проекта
            publicDirectory: '../public',
            buildDirectory: 'build',
            hotFile: '../public/hot',
            // авто-обновление страницы при правке PHP-файлов (роуты, контроллеры)
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    server: {
        // слушать все интерфейсы внутри контейнера, не только localhost
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        // браузер на хосте должен обращаться сюда для hot reload
        origin: 'http://localhost:5173',
        cors: true,
        hmr: {
            host: 'localhost',
        },
    },
})
