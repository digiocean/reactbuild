var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var Dashboard = require('webpack-dashboard')
var DashboardPlugin = require('webpack-dashboard/plugin')
var dashboard = new Dashboard()

module.exports = {
    entry: [
        // 开启 React 代码的模块热替换(HMR)
        "react-hot-loader/patch",

        // 为 webpack-dev-server 的环境打包代码
        // 然后连接到指定服务器域名与端口
        "webpack-dev-server/client?http://localhost:8888",

        // 为热替换(HMR)打包好代码
        // only- 意味着只有成功更新运行代码才会执行热替换(HMR)
        "webpack/hot/only-dev-server",

        // 入口文件
        "./index.js"
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),

        // 对于热替换(HMR)是必须的，让 webpack 知道在哪里载入热更新的模块(chunk)
        publicPath: '/'
    },
    context: path.resolve(__dirname, 'src'),
    devtool: 'inline-source-map',
    devServer: {
        port:8888,
        hot: true,
        quiet:true,
        historyApiFallback:true,
        contentBase: path.resolve(__dirname, 'dist'),

        // 和上文 output 的“publicPath”值保持一致
        publicPath: '/'
    },
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
                [ 'css-loader?modules', 'postcss-loader' ]
            )
        }, ]
    },
    plugins: [

        // 开启全局的模块热替换(HMR)
        new webpack.HotModuleReplacementPlugin(),

        // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
        new webpack.NamedModulesPlugin(),

        // 单独打包css
        new ExtractTextPlugin("bundle.css"),

        // webpack可视化
        new DashboardPlugin(dashboard.setData)

    ],
}
