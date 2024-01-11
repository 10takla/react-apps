import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => (
    {
        plugins: [
            svgr({ exportAsDefault: true }),
            react(),
        ],
        base: mode === 'deploy' ? '/wordLearner/' : '/',
        resolve: {
            alias: [
                { find: 'src', replacement: '/src' },
                { find: '@', replacement: '/src' },
                { find: 'M', replacement: '/src/newProjects/monitor' },
            ],
        },
        define: {
            __IS_DEV__: JSON.stringify(true),
            __API__: JSON.stringify('http://localhost:8000'),
            __PROJECT__: JSON.stringify('frontend'),
        },
    }
));
