<template>
	<div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="商家图片">
      </div>
      <div class="info">
        <p class="name">
          <span class="icon"></span>
          <em>{{seller.name}}</em>
        </p>
        <p class="delivery">{{seller.description}} / {{seller.deliveryTime}}分钟送达</p>
        <p class="supports" v-if="seller.supports">
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </p>
      </div>
      <div class="supportsNum" v-if="seller.supports">
        <span>{{seller.supports.length}}个</span>
        <i class="iconfont icon-arrow_lift">&#xe621;</i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'v-header',
  props: ['seller']
}
</script>
<style lang="less" scoped>
@import '../../common/style/reset.css';
.header {

  .content-wrapper {
    display: flex;
    align-items: center;
    padding: 48px 24px 36px 48px;
    background-color: rgba(7, 17, 27, .5);

    .avatar img {
      width: 128px;
      height: 128px;
      border-radius: 4px;
    }

    .info {
      color: #fff;
      padding-left: 32px;

      .name {

        em {
          font-size: 32px;
          font-style: normal;
          font-weight: bold;
          line-height: 36px;
        }

      }

      .delivery {
        padding-top: 16px;
        font-size: 24px;
        line-height: 24px;
        font-weight: 200;
      }

      .supports {
        padding-top: 20px;
        font-size: 20px;
        font-weight: 200;
        line-height:24px;
      }

    }

  }

}
</style>