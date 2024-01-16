import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
    const rootPath = mode === 'deploy' ? '/react-apps/' : '/';
    return (
        {
            plugins: [
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
            define: {
                __IS_DEV__: JSON.stringify(true),
                __API__: JSON.stringify('http://localhost:8000'),
                __PROJECT__: JSON.stringify('frontend'),
                __ROOT_PATH__: JSON.stringify(rootPath),
            },
        }
    );
});
