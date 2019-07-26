module.exports = {
  plugins: {
    'autoprefixer': {},
    'postcss-write-svg': {
      utf8: false
    }
    // 'postcss-px-to-viewport': {
    //   viewportWidth: 750, // 设计稿宽度
    //   viewportHeight: 1334, // 可以不指定
    //   unitPrecision: 3, // 指定px转换为vw的小数位数
    //   viewportUnit: 'vw', // 需要转化成的视窗单位
    //   selectorBlackList: ['.ignore', '.hairlines'], // 被忽略的不转换为视窗单位的class列表
    //   minPixelValue: 1, // 小于1px的不转换
    //   mediaQuery: false // 允许在媒体查询中转换‘px’
    // }
  }
}
