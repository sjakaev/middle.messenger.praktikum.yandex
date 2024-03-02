/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import viteInspect from 'vite-plugin-inspect';

export default defineConfig({
    build: {
        outDir: 'dist',
    },
    plugins: [
        viteInspect(),
    ],
});
