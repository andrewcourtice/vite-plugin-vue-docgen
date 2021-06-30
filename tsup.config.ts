import type {
    Options
} from 'tsup';

export default {
    dts: true,
    clean: true,
    format: [
        'cjs',
        'esm'
    ]
} as Options;