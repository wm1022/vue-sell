<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <router-link to="/">商品</router-link>
      <router-link to="/ratings">评论</router-link>
      <router-link to="/seller">商家</router-link>
    </div>
    <transition :name="slideDirection">
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </transition>
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
      seller: {},
      slideDirection: 'slide-to-left'
    }
  },
  watch: {
    '$route'(to, from) {
      // 同级路由间进行跳转，根据路由元信息设定的层级，判断左滑还是右滑
      if (to.meta.level > from.meta.level) {
        this.slideDirection = 'slide-to-left'
        return
      } else {
        this.slideDirection = 'slide-to-right'
        return
      }
      // 根据是否返回上一页，使用不同滑动
      if (this.$router.options.isGoBack) {
        this.slideDirection = 'slide-to-right'
      } else {
        this.slideDirection = 'slide-to-left'
      }
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
.slide-to-left-enter, .slide-to-left-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-to-left-leave-active {
  -webkit-transform: translate(-20%, 0);
  transform: translate(-20%, 0);
}
.slide-to-left-enter-active, .slide-to-left-leave-active {
  transition: all .3s ease-in-out;
}
.slide-to-right-enter, .slide-to-right-leave-to {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-to-right-leave-active {
  -webkit-transform: translate(-20%, 0);
  transform: translate(20%, 0);
}
.slide-to-right-enter-active, .slide-to-right-leave-active {
  transition: all .3s ease-in-out;
}
</style>
