<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <router-link to="/">商品</router-link>
      <router-link to="/ratings">评论</router-link>
      <router-link to="/seller">商家</router-link>
    </div>
    <router-view></router-view>
    <div class="footer">this is footer</div>
  </div>
</template>

<script>
import header from "./components/header/header"
import {getSeller} from 'api'

export default {
  name: "app",
  data() {
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
    "v-header": header
  }
};
</script>

<style scoped>
.tab {
  display: flex;
  justify-content: space-between;
}
</style>


