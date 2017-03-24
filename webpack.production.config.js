var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        bundle: "./index.js",
        vendor: ["moment", "react", "react-dom"]
    },
    output: {
        filename: "[name].[chunkhash:6].js",
        path: path.resolve(__dirname, 'dist')
    },
    context: path.resolve(__dirname, 'src'),
    devtool: "cheap-module-source-map",
    module: {
        rules: [{
            test: /\.js$/,
            use: [
                'babel-loader',
            ],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract(
                ['css-loader?modules', 'postcss-loader']
            )
        }, ]
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
            sourceMap: true
        }),
        new ExtractTextPlugin("bundle.[contenthash:6].css"),
        new HtmlWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: true
            }
        })
    ]
}
