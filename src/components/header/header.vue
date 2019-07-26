<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="商家图片">
      </div>
      <div class="info" v-if="seller.supports">
        <p class="name">
          <span class="brand"></span>
          <em>{{seller.name}}</em>
        </p>
        <p class="delivery">{{seller.description}} / {{seller.deliveryTime}}分钟送达</p>
        <p class="supports">
          <supports :type="seller.supports[0].type" :size="1"></supports>
          <span class="text">{{seller.supports[0].description}}</span>
        </p>
      </div>
      <div class="supportsNum" v-if="seller.supports" @click="openHeaderDetail">
        <span>{{seller.supports.length}}个</span>
        <i class="iconfont icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="openHeaderDetail">
      <span class="media"></span>
      <span class="bulletin">{{seller.bulletin}}</span>
      <i class="iconfont icon-keyboard_arrow_right"></i>
    </div>
    <div class="bg"><img :src="seller.avatar" alt=""></div>
    <!-- css sticky布局 -->
    <transition name="fade">
      <header-detail v-show="ifHeaderDetail" :seller="seller" :ifHeaderDetail.sync="ifHeaderDetail"></header-detail>
    </transition>
  </div>
</template>
<script>
import supports from 'components/supports/supports'
import headerDetail from 'components/headerDetail/headerDetail'
export default {
  name: 'v-header',
  props: ['seller'],
  data () {
    return {
      ifHeaderDetail: false
    }
  },
  components: {
    supports,
    headerDetail
  },
  methods: {
    openHeaderDetail: function () {
      this.ifHeaderDetail = true
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../common/style/index.less';

.header {
  position: relative;
  overflow: hidden;
  background-color: rgba(7, 17, 27, .5);

  .content-wrapper {
    display: flex;
    position: relative;
    padding: 24px 12px 18px 24px;

    .avatar {
      img {
        width: 64px;
        height: 64px;
        border-radius: 2px;
      }
    }

    .info {
      padding: 2px 0 0 16px;
      color: #fff;

      .name {
        display: flex;
        align-items: center;
        
        .brand {
          width: 30px;
          height: 18px;
          .bg-image('../../common/images/brand')
        }

        em {
          margin-left: 6px;
          font-size: 16px;
          font-style: normal;
          font-weight: bold;
          line-height: 18px;
        }

      }

      .delivery {
        margin-top: 8px;
        font-size: 12px;
        font-weight: 200;
        line-height: 12px;
      }

      .supports {
        display: flex;
        align-items: center;
        margin-top: 10px;
        font-size: 10px;
        font-weight: 200;
        line-height: 12px;

        .text {
          padding-left: 4px;
        }

      }

    }

    .supportsNum {
      display: flex;
      align-items: center;
      align-self: flex-end;
      position: absolute;
      right: 12px;
      padding: 5px 8px;
      font-size: 10px;
      font-weight: 200;
      color: #fff;
      border-radius: 24px;
      background-color: rgba(0, 0, 0, .2);

      .iconfont {
        padding-left: 2px;
        color: #fff;
      }

    }

  }

  .bulletin-wrapper {
    display: flex;
    align-items: center;
    padding: 0 12px;
    line-height: 28px;
    background-color: rgba(7, 17, 27, .2);

    .media {
      flex-shrink: 0;
      width: 22px;
      height: 12px;
      .bg-image('../../common/images/bulletin');
    }

    .bulletin {
      padding-left: 4px;
      font-size: 10px;
      font-weight: 200;
      color: #fff;
      .text-overflow();
    }

    .iconfont {
      color: #fff;
    }

  }

  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(10px);

    img {
      width: 100%;
      height: 100%;
    }

  }

}
</style>
