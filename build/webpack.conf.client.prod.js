const merge = require('webpack-merge')
const webpack = require('webpack')
const LoadablePlugin = require('@loadable/webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const os = require('os')
const base = require('./webpack.conf.base')
const config = require('./config')
const utils = require('./utils')

const cssLoaders = (modulesCss) => {
    // 处理项目目录内的css
    const projectCssLoader = {
        loader: 'css-loader',
        options: {
            modules: config.common.cssModules,
            localIdentName: '[local]_[hash:base64:5]',
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
        MiniCssExtractPlugin.loader,
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
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].css'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new LoadablePlugin()
    ]
})
