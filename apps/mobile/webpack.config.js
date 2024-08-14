/* eslint-disable no-undef */
const {NxAppWebpackPlugin} = require('@nx/webpack/app-plugin');
const {NxReactWebpackPlugin} = require('@nx/react/webpack-plugin');

module.exports = {
    resolve: {
        alias: {
            'react-native$': 'react-native-web',
            'react-native-elements$': 'react-native-web',
        },
        extensions: [
            '.web.tsx',
            '.web.ts',
            '.web.jsx',
            '.web.js',
            '.tsx',
            '.ts',
            '.jsx',
            '.js',
        ],
    },
    devServer: {
        port: 4200,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images/',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new NxAppWebpackPlugin({
            tsConfig: './tsconfig.app.json',
            compiler: 'babel',
            main: './src/main-web.tsx',
            index: './src/index.html',
            outputPath: 'dist/apps/mobile',
            baseHref: '/',
            assets: ['./src/favicon.ico', './src/assets'],
            styles: [],
            outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
            optimization: process.env['NODE_ENV'] === 'production',
        }),
        new NxReactWebpackPlugin({
            // Uncomment this line if you don't want to use SVGR
            // See: https://react-svgr.com/
            // svgr: false
        }),
    ],
};
