const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
    entry: './src/scripts/index.js',
    mode: 'production',
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        open: true, /*Сайт авт-ки открывается при npm run dev*/
        compress: true,
        port: 9000,
    },
    plugins: [
        /*Подключение плагина читающего HTML*/
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        /*Позволяет загрузить CSS в отдельный файл*/
        new MiniCssExtractPlugin(),
        /*Плагин очищает предыдущую созданную версию проекта */
        new CleanWebpackPlugin()
    ],
    performance: {
        maxAssetSize: 1000000,
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: '/node_modules/',
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }

        }, {
            test: /\.(png|jpg|jpeg|woff(2)?|tff|svg)$/,
            type: "asset/resource",
        }, {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, {
                loader: "css-loader",
                options: {
                    importLoaders: 1
                }
            }, "postcss-loader"],
        },
        ]
    }

};