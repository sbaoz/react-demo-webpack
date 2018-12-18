const utils = require('./utils')

module.exports = {
    resolve: {
        extensions: ['.js','.jsx'],
        alias: {
            '@': utils.resolve('src'),
            '@utils': utils.resolve('src/utils'),
            '@components': utils.resolve('src/components')
        },
        modules: [utils.resolve('node_modules')]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                exclude: utils.resolve('node_modules'),
                enforce: 'pre'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { // babel 转义的配置选项
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // Inline files smaller than 10 kB (10240 bytes)
                    limit: 10 * 1024,
                    name: 'static/img/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // Inline files smaller than 10 kB (10240 bytes)
                    limit: 10 * 1024,
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // Inline files smaller than 10 kB (10240 bytes)
                    limit: 10 * 1024,
                    name: 'static/fonts/[name].[hash:8].[ext]'
                }
            },
        ]
    }
}
