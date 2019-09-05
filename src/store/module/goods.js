// 商家
const goods = {
  state: {
    goods: []
  },
  mutations: {
    setGoods (state, goods) {
      state.goods = goods
    },
    resetGoods (state) {
      state.goods = {}
    }
  }
}

export default goods
