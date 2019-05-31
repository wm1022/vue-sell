import Vue from 'vue'
import Router from 'vue-router'
import Goods from './components/goods/goods'
import Ratings from './components/ratings/ratings'
import Seller from './components/seller/seller'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    from.name ? next({ name: from.name }) : next('/') // 上一级路由正确匹配到，跳到上一级路由，否则跳到首页或者404页面
  } else {
    next()
  }
})

export default router
