const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭语法检查
  lintOnSave: false,
  devServer:{
    proxy:{
      '/api':{
        target:'http://43.136.245.157',
        changeOrigin:true,
        pathRewrite: {'^/api': ''}
      },
    }
  }
})
