// 商家
const seller = {
  state: {
    seller: {}
  },
  mutations: {
    setSeller (state, seller) {
      state.seller = seller
    },
    resetSeller (state) {
      state.seller = {}
    }
  }
}

export default seller
