import fs from 'fs';
import path from 'path';

import vueDocgenPlugin, {
    Options
} from '../src';

describe('Vite Vue-Docgen Plugin', () => {

    const componentPath = path.resolve(__dirname, './component.vue');
    const source = fs.readFileSync(componentPath, 'utf-8');

    async function execute(options?: Options) {
        const {
            transform
        } = vueDocgenPlugin(options);
    
        if (!transform) {
            return;
        }
    
        return transform.call({} as any, source, componentPath);
    }
    
    test('Should parse and inject metadata using default options', async () => {
        const output = await execute();
        expect(output).toMatch(/_sfc_main\.__docgenInfo/);
    });
    
    test('Should parse and inject metadata at the specified property name', async () => {
        const injectAt = '__customPropName';
        const pattern = new RegExp(`_sfc_main\.${injectAt}`);
        
        const output = await execute({
            injectAt
        });
    
        expect(output).toMatch(pattern);
    });

});
