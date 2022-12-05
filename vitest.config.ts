import {
    defineConfig,
} from 'vitest/config';

export default defineConfig({
    test: {
        watch: false,
        environment: 'node',
        outputFile: 'test-results.xml',
        coverage: {
            enabled: false,
            clean: true,
            reporter: [
                'text-summary',
            ],
        },
        reporters: [
            'default',
            'junit',
        ],
    },
});