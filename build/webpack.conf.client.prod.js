const merge = require('webpack-merge')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const base = require('./webpack.conf.base')
const utils = require('./utils')

module.exports = merge(base, {
    mode: 'production',
    entry: [utils.resolve('src/entry-client.js')],
    module: {
        rules: []
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: utils.resolve('public/index.template.html'),
            filename: 'index.html',
        })
    ]
})
