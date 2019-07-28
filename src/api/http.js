import axios from 'axios'

const isProduction = process.env.NODE_ENV === 'production'

const baseURL = isProduction ? 'http://localhost:8080/' : 'http://localhost:8080/' // 前者服务器接口，后者本地接口，配合proxy解决跨域问题

axios.defaults.baseURL = baseURL

const ERR_OK = 0

export function get (url) {
  return function (params) {
    // 对于同一个url，函数被保存到外部
    return axios.get(url, {
      params
    }).then((res) => {
      const { errno, data } = res.data
      if (errno === ERR_OK) {
        return data
      }
    }).catch(() => {
      console.log('出现错误')
    })
  }
}
