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
  import star from 'components/star/star'
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
      star,
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

    .content-wrapper {
      padding: 48px 24px 92px 48px;
      background-color: rgba(7, 17, 27, .5);
      .cf();

      .avatar {
        float: left;

        img {
          width: 128px;
          height: 128px;
          border-radius: 4px;
        }
      }

      .info {
        float: left;
        color: #fff;
        padding-left: 32px;
        padding-top: 4px;

        .name {
          display: flex;
          align-items: center;
          .brand {
            display: inline-block;
            width: 60px;
            height: 36px;
            .bg-image('../../common/images/brand')
          }

          em {
            padding-left: 12px;
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
          display: flex;
          align-items: center;
          padding-top: 20px;
          font-size: 20px;
          font-weight: 200;
          line-height: 24px;

          .text {
            padding-left: 8px;
          }

        }

      }

      .supportsNum {
        position: relative;
        float: right;
        font-size: 20px;
        color: #fff;
        font-weight: 200;
        line-height: 24px;
        padding: 14px 16px;
        top: 85px;
        border-radius: 48px;
        background-color: rgba(0, 0, 0, .2);

        .iconfont {
          padding-left: 4px;
        }

      }

    }

    .bulletin-wrapper {
      display: flex;
      padding: 0 24px;
      margin-top: -56px;
      align-items: center;
      line-height: 56px;
      background-color: rgba(7, 17, 27, .2);

      .media {
        flex-shrink: 0;
        width: 44px;
        height: 24px;
        .bg-image('../../common/images/bulletin');
      }

      .bulletin {
        padding-left: 8px;
        font-size: 20px;
        color: #fff;
        font-weight: 200;
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

    .supportsNum .iconfont {
      color: #fff;
    }

  }
</style>

