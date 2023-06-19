const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

const NODE_ENV = process.env.NODE_ENV

module.exports = {
    mode: NODE_ENV,
    devtool: NODE_ENV == 'development' ? 'source-map' : undefined,
    entry: './src/index.tsx',
    output: {
        filename: 'index.js',
        path: path.join(__dirname, NODE_ENV == 'production' ? 'dist' : 'test'),
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
                    NODE_ENV == 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-react"],
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    optimization: {
        minimizer: ['...'].concat(NODE_ENV == 'production' ? new CssMinimizerPlugin() : []),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            scriptLoading: 'blocking',
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css',
        }),
    ],
    devServer: NODE_ENV == 'development' ? {
        static: {
            directory: path.join(__dirname, 'test')
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
    } : undefined,
}