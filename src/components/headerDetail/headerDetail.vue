<template>
  <div class="header-detail-wrapper" v-show="ifHeaderDetail">
    <div class="header-detail">
      <div class="content">
        <h3>{{seller.name}}</h3>
        <p class="star-wrapper">
          <star :size="48" :score="seller.score"></star>
        </p>
        <!-- 优惠信息 -->
        <div class="offer item">
          <div class="title"><i></i><span>优惠信息</span><i></i></div>
          <ul>
            <li v-for="(item, index) in seller.supports" :key="index">
              <supports :size="2" :type="item.type"></supports>
              <span class="txt">{{item.description}}</span>
            </li>
          </ul>
        </div>
        <!-- 商家公告 -->
        <div class="bulletin item">
          <div class="title"><i></i><span>商家公告</span><i></i></div>
          <div class="txt">
            <p>{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <p href="javascript:;" class="close" @click="closeHeaderDetail"><i class="iconfont icon-close"></i></p>
    </div>
  </div>
</template>

<script>
import supports from 'components/supports/supports'
import star from 'components/star/star'
export default {
  name: 'headerDetail',
  props: ['ifHeaderDetail', 'seller'],
  methods: {
    closeHeaderDetail: function () {
      this.$emit('update:ifHeaderDetail', false)
    }
  },
  components: {
    star,
    supports
  }
}
</script>

<style lang="less" scoped>
@import '../../common/style/index.less';

.header-detail-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 120;
  background-color: rgba(7, 17, 27, .8);

  .header-detail {
    height: 100%;
    padding: 0 32px 0;
    overflow: auto;
    box-sizing: border-box;

    .content {
      min-height: 100%;
      padding-top: 64px;
      padding-bottom: 64px;
      color: #fff;
      box-sizing: border-box;

      h3 {
        font-size: 16px;
        font-weight: 700;
        line-height: 16px;
        text-align: center;
      }

      .star-wrapper {
        padding-top: 16px;
        text-align: center;
      }

      .item {

        .title {
          padding-top: 28px;
          display: flex;
          align-items: center;

          i {
            width: 120px;
            .border-1px(top, rgba(255, 255, 255, .2));
          }

          span {
            flex-shrink: 0;
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700;
            line-height: 14px;
          }

        }

        &.offer {
          li {
            display: flex;
            align-items: center;
            padding-top: 12px;

            &:first-child {
              padding-top: 24px;
            }

            .txt {
              padding-left: 6px;
              font-size: 12px;
              font-weight: 200;
              line-height: 12px;
            }

          }
        }

        &.bulletin {
          .txt {
            padding-top: 24px;
            font-size: 12px;
            font-weight: 200;
            line-height: 24px;
          }
        }

      }

    }

    .close {
      text-align: center;
      margin-top: -64px;

      .iconfont {
        font-size: 32px;
        color: rgba(255, 255, 255, .5)
      }

    }

  }

}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
