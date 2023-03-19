/// <reference types="vitest" />
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: "./src/less/",
                    dest: "./",
                },
            ],
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            fileName: 'poppy-util',
            name: 'PyUtil',
            formats: ['es', 'iife']
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ["vite"],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    // axios: "axios"
                },
            },
        },
    },
    test: {
        environment: 'happy-dom',
    }
})