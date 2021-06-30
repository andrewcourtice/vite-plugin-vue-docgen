import type {
    Options
} from 'tsup';

export default {
    dts: true,
    splitting: false,
    format: [
        'cjs',
        'esm'
    ]
} as Options;