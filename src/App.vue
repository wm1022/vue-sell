<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <router-link to="/">商品</router-link>
      <router-link to="/ratings">评论</router-link>
      <router-link to="/seller">商家</router-link>
    </div>
    <router-view :seller="seller"></router-view>
    <!-- <div class="footer">this is footer</div> -->
  </div>
</template>

<script>
import header from './components/header/header'
import { getSeller } from 'api'
// import { mapState } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this._getSeller()
  },
  methods: {
    _getSeller: function () {
      getSeller().then((seller) => {
        this.seller = seller
        // 将商家信息存入vuex中
        this.$store.commit('setSeller', seller)
      })
    }
  },
  components: {
    'v-header': header
  }
}
</script>
<style lang="less">
@import './common/style/index.less';
html, body {
  height: 100%;
}
#app {
  position: relative;
  height: 100%;
  z-index: 10;
}
.tab {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40px;
  .border-1px(bottom, rgba(7, 17, 27, .1));
  z-index: 10;

  a {
    font-size:14px;
    color:rgb(77, 85, 93);
    line-height: 28px;

    &.router-link-exact-active {
      color: rgb(240, 20, 20);
    }

  }

}
</style>
