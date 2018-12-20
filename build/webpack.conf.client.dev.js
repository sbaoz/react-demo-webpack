const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')
const base = require('./webpack.conf.base')
const utils = require('./utils')
const config = require('./config')

const cssLoaders = (modulesCss) => {
    // 处理项目目录内的css
    const projectCssLoader = {
        loader: 'css-loader',
        options: {
            modules: config.common.cssModules,
            localIdentName: '[path]_[name]_[local]_[hash:base64:5]',
            sourceMap: true,
            importLoaders: 2,
            camelCase: true
        }
    }

    // 处理node_modules目录内的css
    const modulesCssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: true,
            importLoaders: 2
        }
    }

    return [
        'style-loader',
        modulesCss ? modulesCssLoader : projectCssLoader,
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('autoprefixer')({
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9'
                        ],
                        flexbox: 'no-2009',
                        remove: false
                    })
                ],
                sourceMap: true
            }
        },
        {
            loader: 'stylus-loader',
            options: {
                sourceMap: true,
                import: [
                    utils.resolve('src/assets/styles/mixin.styl'),
                    utils.resolve('src/assets/styles/variable.styl')
                ]
            }
        }
    ]
}

module.exports = merge(base, {
    mode: 'development',
    devtool: '#cheap-module-eval-source-map',
    entry: ['react-hot-loader/patch', './src/entry-client.js'],
    output: {
        filename: 'static/js/[name].js',
        path: utils.resolve('dist'),
        publicPath: config.dev.publicPath,
        chunkFilename: 'static/js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(css|styl)$/,
                oneOf: [
                    {
                        resource: /node_modules/,
                        use: cssLoaders(true)
                    },
                    {
                        use: cssLoaders(false)
                    }
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    parser: require('postcss-safe-parser')
                }
            })
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: utils.resolve('public/index.template.html'),
            filename: 'index.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new LoadablePlugin()
    ],
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
})
