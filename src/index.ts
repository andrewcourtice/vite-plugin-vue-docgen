import {
    DocGenOptions,
    parse,
} from 'vue-docgen-api';

import {
    createFilter,
    FilterPattern,
} from '@rollup/pluginutils';

import type {
    Plugin,
} from 'vite';

export interface Options {
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
        docgenOptions,
    } = {
        include: options?.include || /\.vue$/,
        injectAt: '__docgenInfo',
        ...options,
    };

    const filter = createFilter(include, exclude);

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
            }

            return `${source};_sfc_main.${injectAt} = ${JSON.stringify(metaData)}`;
        },
    };
}