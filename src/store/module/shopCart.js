const shopCart = {
  state: {
    shopCart: []
  },
  mutations: {
    setShopCart (state, food) {
      state.shopCart = food
    },
    resetShopCart (state, food) {
      state.ShopCart = []
    }
  }
}

export default shopCart
