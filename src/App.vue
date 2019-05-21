<template>
  <div id="app">
    <v-header></v-header>
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
import header from "./components/header/header";

export default {
  name: "app",
  components: {
    "v-header": header
  }
};
</script>

<style lang="less" scope>
.tab {
  display: flex;
  justify-content: space-between;

  a {
  }
}
</style>
