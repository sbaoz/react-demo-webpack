const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const base = require('./webpack.conf.base')
const utils = require('./utils')
const config = require('./config')

module.exports = merge(base, {
    mode: 'development',
    devtool: '#cheap-module-eval-source-map',
    entry: ['./src/entry-client.js'],
    output: {
        filename: 'static/js/[name].js',
        path: utils.resolve('dist'),
        publicPath: config.dev.publicPath,
        chunkFilename: 'static/js/[name].js'
    },
    devServer: {
        contentBase: utils.resolve('public'),
        publicPath: config.dev.publicPath,
        host: '0.0.0.0',
        port: 3000,
        hot: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\//, to: `${config.dev.publicPath}index.html` }
            ]
        },
        open: false,
        inline: true,
        stats: {
            color: true
        },
        proxy: {
            '/api': {
                target: 'http://xxx:9000',
                pathRewrite: {
                    '^/api': ''
                },
                secure: false,
                changeOrigin: false
            }
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: utils.resolve('public/index.template.html'),
            filename: 'index.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
})
