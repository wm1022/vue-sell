import { get } from './http'

const getSeller = get('/api/seller')
const getGoods = get('/api/Goods')
const getRatings = get('/api/Ratings')

export {
  getSeller,
  getGoods,
  getRatings
}
