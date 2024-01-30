import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import viteInspect from 'vite-plugin-inspect';

export default defineConfig({
  build: {
    outDir: 'dist',
  },
  plugins: [
    viteInspect(),
    handlebars(),
  ],
});
