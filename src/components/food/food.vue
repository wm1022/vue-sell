<template>
  <div class="food" ref="food">
    <div class="food-content">
      <div class="banner">
        <img :src="selectedFood.image" alt="">
        <i class="iconfont icon-arrow_lift" @click="closeFoodDetail"></i>
      </div>
      <div class="info">
        <div class="txt">
          <p class="name">{{selectedFood.name}}</p>
          <p class="sale"><i>月售{{selectedFood.sellCount}}份</i><i>好评率{{selectedFood.rating}}</i></p>
        </div>
        <div class="price">
          <span class="now">￥{{selectedFood.price}}</span><span class="old" v-show="selectedFood.oldPrice">￥{{selectedFood.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper" v-show="selectedFood.count">
          <cartControl :food="selectedFood" ref="cartControl" @shoppingCartAnimate="$parent.getElPos($event)"></cartControl>
        </div>
        <transition name="fade">
          <div class="buy" @click="addFood" v-show="!selectedFood.count">加入购物车</div>
        </transition>
      </div>
      <split v-show="selectedFood.info"></split>
      <div class="intro" v-show="selectedFood.info">
        <p class="title">商品介绍</p>
        <p class="txt">{{selectedFood.info}}</p>
      </div>
      <split v-show="selectedFood.ratings"></split>
      <div class="ratings">
        <p class="title">商品评价</p>
        <ratingFilter :ratings="selectedFood.ratings" @ratingsFilter="toggleRatings($event)" @onlyContent="toggleOnlyContent($event)"></ratingFilter>
        <div class="rating-wrapper">
          <ul v-show="selectedFood.ratings && selectedFood.ratings.length">
            <li v-show="needShow(rating.rateType, rating.text)" v-for="(rating, index) in selectedFood.ratings" class="rating-item border-1px" :key="index">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img class="avatar" width="12" height="12" :src="rating.avatar">
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <p class="text">
                <i class="iconfont" :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>{{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!selectedFood.ratings">暂无评价</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartControl from 'components/cartControl/cartControl'
import split from 'components/split/split'
import ratingFilter from 'components/ratingFilter/ratingFilter'
import BScroll from 'better-scroll'
import { formatDate } from 'common/js/formatDate'
export default {
  name: 'food',
  props: {
    showFoodDetail: {
      type: Boolean
    },
    selectedFood: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      rateType: 2,
      isOnlyContent: false
    }
  },
  created () {
    this.$nextTick(() => {
      const food = this.$refs.food
      this.foodScroll = new BScroll(food, {
        click: true,
        mouseWheel: true
      })
    })
  },
  methods: {
    closeFoodDetail () {
      this.$emit('update:showFoodDetail', false)
    },
    addFood () {
      this.$refs.cartControl.addFood()
    },
    toggleRatings (rateType) {
      this.rateType = rateType
      this.foodScroll.refresh()
    },
    needShow (rateType, text) {
      if (this.isOnlyContent && !text) {
        return false
      }
      if (this.rateType === 2) {
        return true
      } else {
        return this.rateType === rateType
      }
    },
    toggleOnlyContent (isOnlyContent) {
      this.isOnlyContent = isOnlyContent
      this.foodScroll.refresh()
    }
  },
  filters: {
    formatDate (time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    cartControl,
    split,
    ratingFilter
  }
}
</script>

<style lang="less">
@import '~common/style/mixin';
.food {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 48px;
  background-color: #fff;
  z-index: 50;
  overflow: hidden;

  .banner {
    position: relative;

    img {
      width: 100%;
    }

    .iconfont {
      position: absolute;
      left: 10px;
      top: 15px;
      color: #fff;
    }

  }

  .info {
    position: relative;
    padding: 18px;

    .txt {

      .name {
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: #07111b;
      }

      .sale {
        margin-bottom: 18px;
        line-height: 10px;
        height: 10px;
        font-size: 0;

        i {
          display: inline-block;
          font-size: 10px;
          color: #93999f;
          font-style: normal;

          &:first-child {
            margin-right: 12px;
          }

        }

      }

    }

    .price {
      font-weight: 700;
      line-height: 24px;

      .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
      }
        
      .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }

    }

    .cartcontrol-wrapper {
      position: absolute;
      right: 18px;
      bottom: 12px;
    }
    .buy {
      position: absolute;
      right: 18px;
      bottom: 12px;
      z-index: 10;
      height: 24px;
      line-height: 24px;
      padding: 0 12px;
      box-sizing: border-box;
      border-radius: 12px;
      font-size: 10px;
      color: #fff;
      background: rgb(0, 160, 220);
      opacity: 1;
    }
    
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }

    .fade-enter-active, .fade-leave-active {
      transition: all .3s ease-in-out;
    }
        
  }

  .intro {
    padding: 18px;

    .title {
      line-height: 14px;
      margin-bottom: 6px;
      font-size: 14px;
      color: #07111b;
    }

    .txt {
      line-height: 24px;
      padding: 0 8px;
      font-size: 12px;
      color: #4d555d;
    }

  }

  .ratings {
    padding: 18px 0;

    .title {
      line-height: 14px;
      margin: 0 18px 6px;
      font-size: 14px;
      color: #07111b;
    }

    .rating-wrapper {
      padding: 0 18px;
        .rating-item {
          position: relative;
          padding: 16px 0;
          .border-1px(bottom, rgba(7, 17, 27, 0.1));
          .user {
            position: absolute;
            right: 0;
            top: 16px;
            line-height: 12px;
            font-size: 0;
            .name {
              display: inline-block;
              margin-right: 6px;
              vertical-align: top;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
              
            .avatar {
              border-radius: 50%;
            }
              
          }
            
          .time {
            margin-bottom: 6px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
            
          .text {
            line-height: 16px;
            font-size: 12px;
            color: rgb(7, 17, 27);
            .icon-thumb_up, .icon-thumb_down {
              margin-right: 4px;
              line-height: 16px;
              font-size: 12px;
            }
              
            .icon-thumb_up {
              color: rgb(0, 160, 220);
            }
              
            .icon-thumb_down {
              color: rgb(147, 153, 159);
            }
              
          }
            
        }
          
    } 
        


  }

}
</style>

