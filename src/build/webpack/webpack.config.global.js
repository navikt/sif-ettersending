const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

require('dotenv').config();

const webpackConfig = {
    entry: {
        bundle: ['babel-polyfill', `${__dirname}/../../app/App.tsx`],
    },
    output: {
        path: path.resolve(__dirname, './../../../dist'),
        filename: 'js/[name].js',
        publicPath: `${process.env.PUBLIC_PATH}/dist`,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
        alias: {},
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                include: [path.resolve(__dirname, './../../app'), path.resolve(__dirname, './../../common')],
                loader: require.resolve('awesome-typescript-loader'),
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader',
                        },
                        {
                            loader: 'less-loader',
                        },
                    ],
                }),
            },
            {
                test: /\.svg$/,
                use: 'svg-sprite-loader',
            },
        ],
    },
    plugins: [
        new CaseSensitivePathsPlugin(),
        new ExtractTextPlugin({
            filename: 'css/[name].css?[hash]-[chunkhash]-[name]',
            disable: false,
            allChunks: true,
        }),
        new SpriteLoaderPlugin({
            plainSprite: true,
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb|nn|en/),
    ],
};

module.exports = webpackConfig;
