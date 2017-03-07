var webpack = require('webpack');
const BowerResolvePlugin = require('bower-resolve-webpack-plugin');
const globalizePlugin = require('globalize-webpack-plugin');
module.exports = {
    entry: {
        //'polyfills': './src/webpack-polyfills.ts',
        //'vendor': ['./src/webpack-vendor.ts'],
        //I doubt this will work, because app.ts only references app.register.ts
        //What will happen to other files.
        vendor: ['./app/webpack-vendor.js'],
        app: './app/app.js'
    },

    resolve: {
        plugins: [
            new BowerResolvePlugin(),

            new webpack.optimize.CommonsChunkPlugin({
                name: ['app', 'vendor']
            }),
        ],
        extensions: ['.js'],
        modules: ['node_modules', 'bower_components'],
        descriptionFiles: ['package.json', 'bower.json', '.bower.json'],
        mainFields: ['main', 'browser']
    },

    plugins: [
        new globalizePlugin({
            production: true, // true: production, false: development
            developmentLocale: 'en', // locale to be used for development.
            supportedLocales: ['en'], // locales that should be built support for.
            messages: 'messages/[locale].json', // messages (optional)
            output: 'globalize-compiled-data-[locale].[hash].js', // build output.                
        }),
    ],

    output: {
        path: 'dist',
        filename: '[id].bundle.js',

    }
}
