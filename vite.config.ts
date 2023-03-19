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
            formats: ['es', 'cjs', 'umd', 'iife']
        }
    },
    test: {
        environment: 'happy-dom',
    }
})