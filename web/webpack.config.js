/* eslint-disable @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires,no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    devServer: {
        historyApiFallback: true,
    },
    entry: {
        main: './src/index.tsx',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader?configFileName=./tsconfig.build.json',
            },
            {
                test: /\.s?css$/,
                oneOf: [
                    {
                        test: /\.module\.s?css$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    localsConvention: 'camelCase',
                                    modules: {
                                        localIdentName: '[local]__[hash:base64:5]',
                                    },
                                },
                            },
                            'sass-loader',
                        ],
                    },
                    {
                        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                    },
                ],
            },

            {
                test: /\.(png|svg|jpg|gif|gltf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/img',
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/fonts/',
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].chunk.js',
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunksSortMode: 'auto',
            filename: 'index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: true,
            },
            template: path.resolve('./src/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
};
