import axios from 'axios'

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
