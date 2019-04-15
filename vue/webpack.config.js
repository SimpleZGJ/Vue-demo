//由于webpack是基于node构建的, 所以在配置文件时, 任何合法的node代码都是支持的
//1.导入路径模块
const path = require('path');

//导入在内存中生成html页面的插件
//这个插件的两个作用:
    //1.自动在内存中根据指定页面生成了一个内存的页面
    //2.自动把打包好的main.js追加到页面中
const htmlWebpackPlugin = require('html-webpack-plugin');

//2.通过node中的模块操作, 向外暴露一个配置对象
module.exports = {
    //配置打包的默认为开发模式
    mode:'development',
    //配置入口路径: 要打包的文件
    entry:path.join(__dirname, './src/index.js'),
    //配置出口路径: 指定打包好的文件
    output:{
        path: path.join(__dirname, './dist'),//指定输出的路径
        filename:'main.js'//指定输出文件的名字
    },
    //配置dev-server的参数---方法二
    // devServer:{
    //     open: true,//自动打开浏览器
    //     port:3000,//设置端口号
    //     hot:true//启用热更新
    // }
    //配置插件--->所有webpack的插件都配置在这里
    plugins:[
        //创建一个在内存中生成html的插件
        new htmlWebpackPlugin({
            //配置指定模板文件的路径
            template:path.join(__dirname, './src/index.html'),
            //设置生成内存页面的名称
            filename:'index.html'
        })
    ],
    //配置第三方loader模块
    module:{
        //第三方模块的匹配规则
        rules:[
            {test:/\.css$/, use:['style-loader', 'css-loader']},//处理css文件的转化
            {test:/\.less$/, use:['style-loader','css-loader','less-loader']},//处理less文件的loader
            {test:/\.scss$/, use:['style-loader','css-loader','sass-loader']},//处理scss文件的loader
            {test:/\.(png|jpg|gif|jpeg)$/, use:'url-loader?limit=600&name=[hash:8][name].[ext]'},
            //base64格式的图片能减少二次请求.只有小图片才能转
            //设置图片大小的限制 传参 ?limit=图片的大小字节
            // 当图片字节 > 你设置的图片大小字节  转hash值
            // 当图片字节 < 你设置的图片大小字节  转base64格式的图片
            //如果想用自己图片的名字, 加第二个参数 &name=[name].[ext]

            //为了图片重名被覆盖, 再加一个hash值 &name=[hash:8][name].[ext]
            //hash值相当于人的DNA, 能保证两个数据的hash值是不可能相同的 最多32位
            {test:/\.(ttf|eot|svg|woff|woff2)$/, use:"url-loader"},
            //配置babel来转换高级的js语法
            //注意①: 在配置时, 必须要把node_modules目录排除在外
                    //原因: 不排除的话, babel会把node_modules所有的js文件, 全部都打包编译,会非常消耗电脑的CPU, 同时打包速度非常慢, 就算不排除, 也会报错,无法运行
            //注意②: 在项目的根目录中, 新建 .babelrc文件, 这个文件相当于json文件.配置相关的babel参数
            {test:/\.js$/, use:'babel-loader', exclude:/node_modules/},
            //处理.vue的文件
            { test:/\.vue$/, use:'vue-loader'}
        ]
    },
    //配置修改路径
    resolve:{
        //修改vue被导入时的路径
        alias:{
            'vue$':'vue/dist/vue.js'
        }
    }

}