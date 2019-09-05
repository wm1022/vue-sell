import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

// 导入reset
import 'common/style/reset.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
