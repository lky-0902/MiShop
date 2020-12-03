module.exports = {
  //devServer 所有 webpack-dev-server的选项都支持
  devServer:{
    host:'localhost',
    port:8080,
    proxy:{
      '/api':{
        target:'http://mall-pre.springboot.cn',
        changeOrigin:true,
        pathRewrite:{
          '/api':''
        }
      }
    }
  },
  //publicPath:'/app'  部署应用包时的基本 URL,默认为'/'
  //outputDir:'dist'   当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
  //indexPath:'index.html'  指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  //lintOnSave:false   eslint的开关
  productionSourceMap:false, //如不需生产环境的sourcemap 可以将其设为false以加速生产环境构建,另外如果为true会直接暴露代码，不安全
  // 去除head标签中预加载的js文件，实现真正的按需加载
  chainWebpack:(config) => {
    config.plugins.delete('prefetch')
  }
}