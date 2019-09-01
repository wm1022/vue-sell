<template>
  <div class="shopping-cart">
    <div class="cart-content">
      <div class="content">
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
    <div class="ball-content">
      <div v-for="(item, index) in balls" :key="index">
        <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
        <div class="ball" v-show="item.show">
          <span class="inner">1</span>
        </div>
      </transition>
      </div>
    </div>
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
    },
    addBtnPos: {}
  },
  data () {
    return {
      openCartList: false,
      listShow: false,
      balls: [
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false}
      ],
      dropBall: []
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
    }
  },
  watch: {
    openCartList: function () {
      if (!this.openCartList)  {
        this.listShow = false
        return
      }
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.cartList, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
      if (!this.selectedCount) {
        this.listShow = false
        return
      }
      this.listShow = true
    }
  },
  methods: {
    toggleCartList () {
      if (!this.selectedCount) return
      this.openCartList = !this.openCartList
    },
    clearCart () {
      this.selectedFoods.forEach((food) => {
        food.count = 0;
      })
      this.openCartList = false
    },
    // 小球下落
    dropDown (el) {
      // el为添加按钮
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBall.push(ball)
          return
        }
      }
    },
    beforeEnter (el) {
      // el为小球
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.querySelector('.inner')
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
          // inner.style.opacity = 1
        }
      }
    },
    enter (el, done) {
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.querySelector('.inner')
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
        // inner.style.opacity = 0
        el.addEventListener('transitionend', done) // transitionend 事件在css transition结束后触发
      });
    },
    afterEnter (el) {
      let ball = this.dropBall.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
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
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;

  .cart-content {

    .content {
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

  .ball-content {
    position: fixed;
    left: 36px;
    bottom: 25px;

    .ball {
      transition: all .4s cubic-bezier(.6,-0.18,.8,.65);

      .inner {
        display: flex;
        width: 16px;
        height: 16px;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #fff;
        border-radius: 50%;
        background-color: #00a0dc;
        z-index: 20;
        transition: all .4s linear;
      }

    }

  }
  
}
</style>
