export function formatDate (date, format) {
  let ft = format
  let year = ft.match(/(y+)/)
  if (year) {
    // getFullYear返回的是number
    ft = ft.replace(year, date.getFullYear().toString().substr(4 - date.getFullYear().toString().length))
  }
  // 定义月，日，时，分，秒的正则与函数的对应关系
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    const p = new RegExp(`(${k})`)
    if (p.test(ft)) {
      const str = ft.match(p)
      ft = ft.replace(str[0], str[0].length === 1 ? o[k] : addLeftZero(o[k].toString()))
    }
  }
  function addLeftZero (value) {
    return ('00' + value).substr(value.length)
  }
  return ft
}
