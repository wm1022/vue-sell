const path = require('path')
const appDate = require('./data.json')
const seller = appDate.seller
const ratings = appDate.ratings
const goods = appDate.goods

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 设置alias别名
  chainWebpack (config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
  },
  // 简单mock数据
  devServer: {
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
  }
}
