import Vue from 'vue'
import Vuex from 'vuex'

import seller from './module/seller'
import goods from './module/goods'
import shopCart from './module/shopCart'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    seller,
    goods,
    shopCart
  }
})

export default store
