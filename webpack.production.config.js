var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

module.exports = {
    entry: {
        bundle: "./build.js",
        vendor: ["react", "react-dom","react-router","react-router-dom"]
    },
    output: {
        filename: "[name].[chunkhash:6].js",
        path: path.resolve(__dirname, 'dist')
    },
    context: path.resolve(__dirname, 'src'),
    module: {
        rules: [{
            test: /\.js$/,
            use: [
                'babel-loader',
            ],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                // 懒加载组件用到
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: {
                        modules: true,
                        minimize:true,
                        importLoaders: true,
                        localIdentName: "[name]-[local]-[hash:base64:6]"
                    }
                }, {
                    loader: "postcss-loader",
                    options: {
                        plugins: function() {
                            return [
                                require("autoprefixer")
                            ]
                        }
                    }
                }]
            })
        }, {
            test: /\.ejs$/,
            loader: 'ejs-loader'
        }, {
            test: /\.(woff|woff2|ttf|svg|eot)$/,
            loader: "url?limit=10000"
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            loader: 'url?limit=10000&name=img/[name].[hash].[ext]'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor", "manifest"]
        }),
        new webpack.optimize.UglifyJsPlugin({
            // sourceMap: true
        }),
        new ExtractTextPlugin("bundle.[contenthash:6].css"),
        new HtmlWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: true
            },
            inlineSource: "manifest"
        }),
        new HtmlWebpackInlineSourcePlugin()
    ]
}
