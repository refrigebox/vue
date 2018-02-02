const path = require('path');

module.exports = {
    entry:'./src/app.js', //唯一入口文件
    output:{
        path:path.join(__dirname,'dist'), //打包后的文件存放的地方
        filename:'[name].js' //打包后输出文件的文件名
    }
}