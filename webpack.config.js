//引用一个包
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
//webpack 中的所有的配置都应该写在module.exports
//webpack开发服务器： webpack-dev-server,项目直接在服务器运行，项目改动自动刷新浏览器
//clean-webpack-plugin   每次编译前，清空dist目录
//resolve:设置引用模块
//处理es的兼容性问题：babel，将新语法转换成旧语法，旧浏览器不支持的，他可以实现支持
const { CleanWebpackPlugin }  = require("clean-webpack-plugin")
module.exports = {
    //指定入口文件
    entry: "./src/index.ts",
    //指定打包文件所在的目录
    output: {
        path: path.resolve(__dirname,"dist"),
        //打包后的文件名字
        filename: "bundle.js",
        //告诉webpack不使用箭头函数
        environment: {
            arrowFunction: false,
            const: false,
        }
    },

    mode: 'development', // 设置mode

    //指定webpack打包时要使用的模块
    module: {
        //指定加载的规则
        rules: [
            {
                //test指定的是规则生效的文件，
                //所有以ts结尾的文件
                test: /\.ts$/,
                //要使用的loader
                use: [
                    //配置"babel-loader"
                    {
                        loader: "babel-loader",
                        //配置babel
                        options: {
                            //设置预定义的环境
                            presets: [
                                [
                                    //指定环境插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        //需要兼容的目标浏览器
                                        targets: {
                                            //指定浏览器的版本
                                            "chrome": "88",
                                            "ie": "10",
                                        },
                                        //指定corejs的版本
                                        "corejs": "3",
                                        //使用corejs的方式， useage:表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    "ts-loader"
                ],
                //指出不处理的文件
                exclude: /node_modules/
            },
            //设置less文件的处理
            {
                test: /\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    //引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: "last 2 versions"
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader",
                ]
            }
        ]
    },
    //配置html-webpack-plugin插件
    plugins: [
        new CleanWebpackPlugin(),
        //自动生成HTML文件，并引入相关文件
        new HtmlWebpackPlugin({
            //生成的HTML文件的模板
            template: "./src/index.html"
        })
    ],
    //ts和js结尾的文件，可以作为模块使用
    resolve : {
        extensions: ['.ts', '.js']
    }
}