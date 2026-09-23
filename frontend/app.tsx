import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import type { ComponentType } from 'react'

void createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob<{ default: ComponentType }>('./pages/**/*.tsx'),
        ).then((module) => module.default),
    setup({ el, App, props }) {
        if (!el) return
        createRoot(el).render(<App {...props} />)
    },
})
