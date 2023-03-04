const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/scripts/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'test'),
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|svg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-react"],
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            scriptLoading: 'blocking',
        }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'test')
        }, 
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: {
            index: 'index.html',
        },
        devMiddleware: {
            writeToDisk: true,
        },
    },
}