import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import wasm from 'vite-plugin-wasm';

export default defineConfig(({ mode }) => {
    const rootPath = mode === 'deploy' ? '/react-apps/' : '/';
    return (
        {
            plugins: [
                wasm(),
                svgr({ exportAsDefault: true }),
                react(),
            ],
            base: rootPath,
            resolve: {
                alias: [
                    { find: 'src', replacement: '/src' },
                    { find: '@', replacement: '/src/wordLearner' },
                    { find: 'M', replacement: '/src/monitors' },
                    { find: 'A', replacement: '/src/answersToQuestions' },
                ],
            },
            esbuild: {
                supported: {
                    'top-level-await': true,
                },
            },
            define: {
                __IS_DEV__: JSON.stringify(true),
                __API__: JSON.stringify('http://localhost:8000'),
                __PROJECT__: JSON.stringify('frontend'),
                __ROOT_PATH__: JSON.stringify(rootPath),
            },
        }
    );
});
