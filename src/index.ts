import {
    parse,
    DocGenOptions
} from 'vue-docgen-api';

import type {
    Plugin
} from 'vite';

export interface Options {
    pattern?: RegExp;
    injectAt?: string;
    docgenOptions?: DocGenOptions;
}

export default function(options?: Options): Plugin {
    const {
        pattern,
        injectAt,
        docgenOptions
    } = {
        pattern: /\.vue$/,
        injectAt: '__docgenInfo',
        ...options
    };

    return {
        name: 'vite-plugin-vue-docgen',
        enforce: 'post',

        async transform(source, id, ssr) {
            if (!pattern.test(id)) {
                return;
            }

            const metaData = await parse(id, docgenOptions);
            const metaSource = JSON.stringify(metaData);

            return `${source};_sfc_main.${injectAt} = ${metaSource}`;
        }
    };
}