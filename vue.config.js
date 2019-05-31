const path = require('path')
// const appDate = require('./data.json')
// const seller = appDate.seller
// const ratings = appDate.ratings
// const goods = appDate.goods

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // 设置alias别名, 如果想在css文件引入中使用别名，需要加上~避免歧义
  chainWebpack (config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))

    // 当不需要生成html时,删除html相关的webpack插件
    // config.plugins.delete('html)
    // config.plugins.delete('preload')
    // config.plugins.delete('prefetch')

    // 修改poader,webpack在处理静态资源时，会用url-loader将小于4kb的资源内联，减少http请求数量，内联文件的大小限制修改方法：
    config.module.rule('images').use('url-loader').loader('url-loader').tap(options => Object.assign(options, { limit: 10240 }))

    // 修改插件选项
    config.plugin('html').tap(args => {
      // 修改入口模板文件
      // args[0].template = '/Users/username/proj/app/templates/index.html'
      // 打包时是否压缩html
      args[0].minify = false
      return args
      // 更多配置：https://github.com/jantimon/html-webpack-plugin#options
    })
  },
  configureWebpack: config => {
    // 基于环境配置一些行为
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  devServer: {
    // 设置代理，解决跨域问题，只在开发环境下有效，生产环境下要将请求的baseurl配置为服务器端路径
    proxy: {
      '/api': {
        target: 'http://192.168.1.136:8081',
        changeOrigin: true,
        // 对/api进行重写
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
    // 简单mock数据
    // before (app) {
    //   app.get('/api/seller', function (req, res) {
    //     res.json({
    //       errno: 0,
    //       data: seller
    //     })
    //   })
    //   app.get('/api/ratings', function (req, res) {
    //     res.json({
    //       errno: 0,
    //       data: ratings
    //     })
    //   })
    //   app.get('/api/goods', function (req, res) {
    //     res.json({
    //       errno: 0,
    //       data: goods
    //     })
    //   })
    // }
  },

  pluginOptions: {
    // 为每个less文件引入变量文件
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/common/style/variable.less')]
    }
  }
}
