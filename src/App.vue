<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <router-link to="/">商品</router-link>
      <router-link to="/ratings">评论</router-link>
      <router-link to="/seller">商家</router-link>
    </div>
    <router-view></router-view>
    <!-- <div class="footer">this is footer</div> -->
  </div>
</template>

<script>
import header from './components/header/header'
import { getSeller } from 'api'

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
      })
    }
  },
  components: {
    'v-header': header
  }
}
</script>
<style lang="less" scoped>
@import './common/style/index.less';
#app {
  position: relative;
  height: 100%;
}
.tab {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  .border-1px(bottom, rgba(7, 17, 27, .1));
  z-index: 2;

  a {
    font-size:28px;
    color:rgb(77, 85, 93);
    line-height: 28px;

    &.router-link-exact-active {
      color: rgb(240, 20, 20);
    }

  }

}
</style>
