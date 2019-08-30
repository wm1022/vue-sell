const path = require('path')
const appDate = require('./data.json')
const seller = appDate.seller
const ratings = appDate.ratings
const goods = appDate.goods

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: false,
  // 设置alias别名, 如果想在css文件引入中使用别名，需要加上~避免歧义
  chainWebpack (config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
  },
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
