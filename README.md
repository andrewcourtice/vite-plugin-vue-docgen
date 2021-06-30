# Vite Vue-Docgen Plugin
This is a very simple Vite plugin that wraps the [Vue Docgen API](https://github.com/vue-styleguidist/vue-styleguidist/tree/dev/packages/vue-docgen-api) for providing metadata about Vue single file components (SFC).

## Usage
To use, simply import the plugin and register it **after** the Vue plugin in your Vite config:

```javascript
// vite.config.js

import vuePlugin from '@vitejs/plugin-vue';
import vueDocgenPlugin from 'vite-plugin-vue-docgen';

export default {
    plugins: [
        vuePlugin(),
        vueDocgenPlugin()
    ]
}
```

The docgen metadata will then be accessible as a property on the component:

```javascript
import Button from './button.vue';

const {
    displayName,
    description,
    props,
    methods,
    slots
} = Button.__docgenInfo;
```

## Options
```javascript
const options = {
    
    /* Regex (optional) - The file path pattern to match */
    pattern: /\.vue$/,

    /* String (optional) - The property name to inject the docgen metadata at */
    injectAt: '__docgenInfo'

    /* Object (optional) - Specific Docgen API options */
    docgenOptions: {
        jsx: true
    }
};
```

See [here](https://github.com/vue-styleguidist/vue-styleguidist/tree/dev/packages/vue-docgen-api#options-docgenoptions) for a full list of docgen API options.