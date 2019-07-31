<template>
  <div class="shopping-cart">
    <div class="cart-content">
      <div class="cart" @click="toggleCartList">
        <div class="inner" :class="{highLight: selectedCount}">
          <i class="iconfont icon-shopping_cart"></i>
        </div>
        <span class="count" v-show="selectedCount">{{selectedCount}}</span>
      </div>
      <div class="price" :class="{highLight: selectedPrice}">￥<span>{{selectedPrice}}</span></div>
      <div class="delivery">另需配送费￥<span>{{deliveryPrice}}</span>元</div>
      <div class="pay" :class="payClass">{{payDesc}}</div>
    </div>
    <transition name="slide">
      <div class="cart-list" v-show="listShow">
      <div class="title">
        <span class="name">购物车</span>
        <span class="clear" @click="clearCart">清空</span>
      </div>
      <div class="list" ref="cartList">
        <ul> 
          <li v-for="(food, index) in selectedFoods" :key="index">
            <span class="name">{{food.name}}</span>
            <div class="right">
              <span class="price"><small>￥</small>{{food.price}}</span>
              <cartControl :food="food"></cartControl>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>
    <transition name="fade">
      <div class="overlay" v-show="listShow" @click="toggleCartList"></div>
    </transition>
  </div>
</template>

<script>
import cartControl from 'components/cartControl/cartControl'
import BScroll from 'better-scroll'
export default {
  name: 'shoppingCart',
  props: {
    minPrice: {
      type: Number
    },
    deliveryPrice: {
      type: Number
    },
    selectedFoods: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      openCartList: false
    }
  },
  computed: {
    selectedCount: function () {
      let count = 0
      this.selectedFoods.forEach(function (el) {
        count += el.count
      })
      return count
    },
    selectedPrice: function () {
      let price = 0
      this.selectedFoods.forEach(function (el) {
        price += (el.price * el.count)
      })
      return price
    },
    payDesc: function () {
      if (this.selectedPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.selectedPrice < this.minPrice) {
        let diff = this.minPrice - this.selectedPrice
        return `￥还差${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass: function () {
      if (this.selectedPrice >= this.minPrice) {
        return 'enough'
      } else {
        return 'not-enough'
      }
    },
    listShow: function () {
      if (!this.openCartList) return false
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.cartList, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
      if (!this.selectedCount) return false
      return true
    }
  },
  methods: {
    toggleCartList () {
      this.openCartList = !this.openCartList
    },
    clearCart () {
      this.selectedFoods.forEach((food) => {
        food.count = 0;
      })
      this.openCartList = false
    }
  },
  components: {
    cartControl
  }
}
</script>

<style lang="less">
@import "../../common/style/index.less";
.shopping-cart {

  .cart-content {
    display: flex;
    align-items: center;
    position: relative;
    height: 48px;
    padding-left: 18px;
    color: rgba(255, 255, 255, .4);
    background-color: #141d27;
    z-index: 10;

    .cart {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      top: -5px;
      width: 56px;
      height: 56px;
      margin-top: -10px;
      border-radius: 50%;
      background-color: #141d27;

      .inner {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background-color: #333;

        .iconfont {
          font-size: 24px;
          color: rgba(255, 255, 255, .4);
          line-height: 24px;
        }

        &.highLight {
          background-color: rgb(0, 160, 220);
          
          .iconfont {
            color: #fff;
          }

        }

      }

      .count {
        position: absolute;
        top: 0;
        right: 0px;
        width: 24px;
        font-size: 9px;
        font-weight: 700;
        color: #fff;
        text-align: center;
        line-height: 16px;
        border-radius: 12px;
        background-color: rgb(240, 20, 20);
        box-shadow: 0 4px 8px 0px rgba(0, 0, 0, .4);
      }

    }

    .price {
      margin-left: 12px;
      padding-right: 12px;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      .border-1px(right, rgba(255, 255, 255, .1));

      span {
        font-weight: 700;
      }

      &.highLight {
        color: #fff;
      }

    }

    .delivery {
      padding-left: 12px;
      font-size: 12px;
      line-height: 24px;
    }
    
    .pay {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0;
      width: 105px;
      height: 100%;
      padding: 0 8px 0;
      font-size: 12px;
      font-weight: 700;
      color: rgba(255, 255, 255, .4);
      background-color: #333;
      box-sizing: border-box;

      &.enough {
        color: #fff;
        background-color: rgb(0, 160, 220);
      }

    }

  }

  .cart-list {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 305px;
    padding-bottom: 60px;
    background-color: #fff;
    z-index: 5;
    box-sizing: border-box;

    .title {
      display: flex;
      justify-content: space-between;
      padding: 0 18px;
      line-height: 40px;
      background-color: #f3f5f7;

      .name {
        font-size: 14px;
        font-weight: 200;
        color: rgb(7, 17, 27);
      }

      .clear {
        font-size: 12px;
        color: rgb(0, 160, 220);
      }

    }

    .list {
      height: 205px;
      overflow: hidden;

      li {
        display: flex;
        align-items: center;
        position: relative;
        justify-content: space-between;
        padding: 12px 18px;
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 24px;
        border-top: 1px solid rgba(7, 17, 27, .1);

        .name {
          display: block;
          width: 100%;
          margin-right: 18px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .right {
          display: flex;

          .price {
            margin-right: 12px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
            line-height: 24px;

            small {
              font-size: 10px;
              font-weight: normal;
            }

          }

        }

      }

    }

  }

  .slide-enter-active, .slide-leave-active {
    transition: all .3s ease-in-out;
  }

  .slide-enter, .slide-leave-to {
    bottom: -305px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .3s ease-in-out;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(7, 17, 27, .6);
    filter: blur(10px);
    z-index: 3;
  }
  
}
</style>
