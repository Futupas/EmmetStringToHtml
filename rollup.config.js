import typescript from 'rollup-plugin-typescript2';

export default [
    // {
    //     input: './src/index.ts',
    //     output: {
    //         file: './www/index.esm.js',
    //         format: 'esm',
    //     },
    //     plugins: [typescript()],
    // },
    // {
    //     input: './src/index.ts',
    //     output: {
    //         file: './www/emmet-to-html.c.js',
    //         format: 'cjs',
    //     },
    //     plugins: [typescript()],
    // },
    {
        input: './src/index.ts',
        output: {
            file: './www/emmet-to-html.js',
            format: 'iife',
        },
        plugins: [typescript()],
    },
];
