import Vue from 'vue'
import Router from 'vue-router'
const Goods = () => import(/* webpackChunkName: "group-goods" */ './components/goods/goods')
const Food = () => import(/* webpackChunkName: "group-seller" */ './components/food/food')
const Ratings = () => import(/* webpackChunkName: "group-seller" */ './components/ratings/ratings')
const Seller = () => import(/* webpackChunkName: "group-seller" */ './components/seller/seller')

Vue.use(Router)

// 通过isGoBack判断路由是前进还是后退
Router.prototype.goBack = function (n) {
  this.options.isGoBack = n < 1
  this.go(n)
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  isGoBack: false,
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods,
      meta: {
        level: 1
      }
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings,
      meta: {
        level: 2
      }
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller,
      meta: {
        level: 3
      }
    },
    {
      path: '/food',
      name: 'food',
      component: Food
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
