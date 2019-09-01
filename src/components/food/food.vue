<template>
  <div class="food">
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
        <cartControl :food="selectedFood" ref="cartControl"></cartControl>
      </div>
      <transition name="fade">
        <div class="buy" @click="addFood" v-show="!selectedFood.count">加入购物车</div>
      </transition>
    </div>
    <div class="intro">
      <p class="name">商品介绍</p>
      <p class="txt">{{selectedFood.info}}</p>
    </div>
    <div class="ratings">
      <p class="name">商品评价</p>
      <div class="tab">
        <span>全部<small>57</small></span>
        <span>推荐<small>47</small></span>
        <span>吐槽<small>10</small></span>
      </div>
      <div class="filter">
        <label>
          <i class="g-iconfont"></i>
          <span>只看有内容的评价</span>
        </label>
      </div>
      <ul class="ratings-list">
        <li>
          <div class="user">
            <span class="name"></span>
            <img src="" alt="">
          </div>
          <div class="time"></div>
          <div class="txt">
            <i class="g-iconfont"></i>
            <span></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import cartControl from 'components/cartControl/cartControl'
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
  methods: {
    closeFoodDetail () {
      console.log(1)
      this.$emit('update:showFoodDetail', false)
    },
    addFood () {
      this.$refs.cartControl.addFood()
    }
  },
  components: {
    cartControl
  }
}
</script>

<style lang="less">
.food {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  bottom: 53px;
  background-color: #fff;
  z-index: 50;

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

}
</style>

