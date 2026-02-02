import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        target: 'esnext',
        minify: 'esbuild',
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router-dom'],
                    wagmi: ['wagmi', 'viem', '@tanstack/react-query'],
                },
            },
        },
    },
    server: {
        port: 5173,
        strictPort: true,
    },
    preview: {
        port: 4173,
    },
})
