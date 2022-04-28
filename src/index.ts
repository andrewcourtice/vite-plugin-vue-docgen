import {
    parse,
    DocGenOptions
} from 'vue-docgen-api';

import {
    createFilter,
    FilterPattern
} from '@rollup/pluginutils';

import type {
    Plugin
} from 'vite';

export interface Options {
    /** @deprecated please use `include` instead */
    pattern?: RegExp;
    include?: FilterPattern;
    exclude?: FilterPattern;
    injectAt?: string;
    docgenOptions?: DocGenOptions;
}

export default function(options?: Options): Plugin {
    const {
        injectAt,
        include,
        exclude,
        docgenOptions
    } = {
        include: options?.include || options?.pattern || /\.vue$/,
        injectAt: '__docgenInfo',
        ...options
    };

    var filter = createFilter(include, exclude);

    return {
        name: 'vite-plugin-vue-docgen',
        enforce: 'post',

        async transform(source, id, ssr) {
            if (!filter(id)) {
                return;
            }
            
            let metaData = {};

            try {
                metaData = await parse(id, docgenOptions);
            } catch (error) {
                console.warn(error);
            } finally {
                return `${source};_sfc_main.${injectAt} = ${JSON.stringify(metaData)}`;
            }
        }
    };
}