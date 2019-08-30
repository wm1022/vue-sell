const path = require('path')
const appDate = require('./data.json')
const seller = appDate.seller
const ratings = appDate.ratings
const goods = appDate.goods

module.exports = {
  devServer: {
    // 设置代理，解决跨域问题，只在开发环境下有效，生产环境下要将请求的baseurl配置为服务器端路径
    // proxy: {
    //   '/api': {
    //     target: 'http://192.168.1.136:8080',
    //     changeOrigin: true,
    //     // 对/api进行重写
    //     pathRewrite: {
    //       '^/api': '/api'
    //     }
    //   }
    // }
    // 简单mock数据
    before (app) {
      app.get('/api/seller', function (req, res) {
        res.json({
          errno: 0,
          data: seller
        })
      })
      app.get('/api/ratings', function (req, res) {
        res.json({
          errno: 0,
          data: ratings
        })
      })
      app.get('/api/goods', function (req, res) {
        res.json({
          errno: 0,
          data: goods
        })
      })
    }
  },

  pluginOptions: {
    // 为每个less文件引入变量文件
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/common/style/variable.less')]
    }
  }
}
