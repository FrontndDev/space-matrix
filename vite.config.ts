import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJSX from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader'
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VueJSX(),
        svgLoader({
            defaultImport: 'url'
        })
    ],
    build: {
        manifest: true
    },
    base: '/app/matrix/v'
})
