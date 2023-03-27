import fs from 'fs';
import path from 'path';

import {
    describe,
    expect,
    test,
} from 'vitest';

import vueDocgenPlugin, {
    Options,
} from '../src';

describe('Vite Vue-Docgen Plugin', () => {

    const basicComponentPath = path.resolve(__dirname, './basic-component.vue');
    const setupComponentPath = path.resolve(__dirname, './setup-component.vue');

    function getSource(path: string) {
        return fs.readFileSync(path, 'utf-8');
    }

    async function execute(path: string, options?: Options) {
        const {
            transform,
        } = vueDocgenPlugin(options);

        if (!transform || typeof transform !== 'function') {
            return;
        }

        return transform.call({} as any, getSource(path), path);
    }

    test('Should parse and inject metadata using default options', async () => {
        const output = await execute(basicComponentPath);
        expect(output).toMatch(/_sfc_main\.__docgenInfo/);
    });

    test('Should parse and inject metadata at the specified property name', async () => {
        const injectAt = '__customPropName';
        const pattern = new RegExp(`_sfc_main.${injectAt}`);

        const output = await execute(basicComponentPath, {
            injectAt,
        });

        expect(output).toMatch(pattern);
    });

    test('Should handle script setup components', async () => {
        const output = await execute(setupComponentPath);
        expect(output).toMatch(/_sfc_main\.__docgenInfo/);
    });

});
