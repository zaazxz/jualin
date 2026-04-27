import './bootstrap';
import '../css/app.css';

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

createInertiaApp({
    title: (title) => `${title} - Jual.in`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx"),
        ),
    setup({ el, App, props }) {
        if (!el) {
            console.error('Inertia root element not found!');
            return;
        }
        createRoot(el).render(<App {...props}/>)
    },
    progress: {
        color: "#7C3AED"
    }
})