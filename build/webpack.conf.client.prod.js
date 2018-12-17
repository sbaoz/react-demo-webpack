const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const os = require('os')
const base = require('./webpack.conf.base')
const config = require('./config')
const utils = require('./utils')

module.exports = merge(base, {
    mode: 'production',
    devtool: '#source-map',
    entry: {
        main: utils.resolve('src/entry-client.js')
    },
    output: {
        filename: 'static/js/[name].[chunkhash:8].js',
        path: utils.resolve('dist'),
        publicPath: config.prod.publicPath,
        chunkFilename: 'static/js/[name].[chunkhash:8].js'
    },
    optimization: {
        nodeEnv: 'production',
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: os.cpus().length,
                uglifyOptions: {
                    ecma: 5,
                    mangle: false,
                },
                sourceMap: false,
            })
        ],
        concatenateModules: true,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: utils.resolve('public/index.template.html'),
            filename: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency',
        }),
        new ManifestPlugin(),
        new InlineManifestWebpackPlugin('manifest'),
        new webpack.HashedModuleIdsPlugin(),
    ]
})
