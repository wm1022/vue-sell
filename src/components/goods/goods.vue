<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="menu">
        <li v-for="(good, index) in goods" :key="index" :class="{'current': currentIndex == index}"
          @click="selectMenu(index,$event)" ref="menuItem">
          <span class="menu_item">
            <supports :size="1" :type="good.type" v-if="good.type!=-1"></supports>
            <span class="txt">{{good.name}}</span>
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <div class="foods">
        <div class="item" ref="foodsItem" v-for="(good, index) in goods" :key="index">
          <h4>{{good.name}}</h4>
          <ul>
            <li v-for="(food, index) in good.foods" :key="index" @click="foodDetailShow(food)">
              <div class="pic">
                <img :src="food.icon" alt="">
              </div>
              <div class="txt">
                <p class="name">{{food.name}}</p>
                <p class="desc" v-if="food.description"><span>{{food.description}}</span></p>
                <p class="sellCount"><span>月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span></p>
                <p class="price"><span class="new">￥{{food.price}}</span><span class="old"
                    v-if="food.oldPrice">￥{{food.oldPrice}}</span></p>
                <cartControl :food="food" @shoppingCartAnimate="getElPos($event)"></cartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="shopping-cart-wrapper">
      <shoppingCart ref="shoppingCart" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"
        :selected-foods.sync="selectedFoods"></shoppingCart>
    </div>
    <transition name="move">
      <food v-show="showFoodDetail" :selectedFood="selectedFood" :showFoodDetail.sync="showFoodDetail"></food>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import supports from 'components/supports/supports'
import shoppingCart from 'components/shoppingCart/shoppingCart'
import cartControl from 'components/cartControl/cartControl'
import food from 'components/food/food'
import BScroll from 'better-scroll'
import {
  getGoods
} from 'api'
export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      addBtnPos: 0,
      showFoodDetail: false,
      selectedFood: {}
    }
  },
  computed: {
		// ...mapState({
    //   // selectedFoods: state => state.shopCart.shopCart,
    //   goods: state => state.goods.goods
    // }),
    currentIndex: function () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let h1 = this.listHeight[i]
        let h2 = this.listHeight[i + 1]
        if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
          this.followScroll(i)
          return i
        }
      }
      return 0
    },
    selectedFoods: function () {
      let foods = []
      this.goods.forEach(function (good) {
        good.foods.forEach(function (food) {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      // 將foods存入store中
      // this.$store.commit('setShopCart', foods)
      return foods
    }
  },
  // watch: {
  //   goods: {
  //     deep: true, 
  //     handler () {
  //       console.log(this.goods)
  //       let foods = []
  //       this.goods.forEach(function (good) {
  //         good.foods.forEach(function (food) {
  //           if (food.count) {
  //             foods.push(food)
  //           }
  //         })
  //       })
  //     // 將foods存入store中
  //     this.$store.commit('setShopCart', foods)
  //     console.log(this.$store.state.shopCart)
  //     }
  //   }
  // },
  created() {
    getGoods().then(goods => {
      this.goods = goods
      // 将goods存入store
      this.$store.commit('setGoods', goods)
      // 设置滚动
      this.$nextTick(() => {
        this.goodsScroll()
        this.calculateHeight()
      })
    })
  },
  methods: {
    // 滚动
    goodsScroll: function () {
      const menuWrapper = this.$refs.menuWrapper
      const foodsWrapper = this.$refs.foodsWrapper
      this.menuScroll = new BScroll(menuWrapper, {
        click: true,
        mouseWheel: true
      })
      this.foodsScroll = new BScroll(foodsWrapper, {
        probeType: 3,
        click: true,
        mouseWheel: true
      })
      this.foodsScroll.on('scroll', (pos) => {
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y))
        }
      })
    },
    // 计算右侧每个区间高度
    calculateHeight: function () {
      const foodsItem = this.$refs.foodsItem
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodsItem.length; i++) {
        const item = foodsItem[i]
        height += item.offsetHeight
        this.listHeight.push(height)
      }
    },
    // 点击菜单
    selectMenu: function (index, event) {
      if (!event._constructed) {
        return
      }
      const foodsItem = this.$refs.foodsItem
      const el = foodsItem[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    // 菜单跟随滚动
    followScroll: function (i) {
      const menuItem = this.$refs.menuItem
      const el = menuItem[i]
      this.menuScroll.scrollToElement(el, 300, -100)
    },
    // 点击添加时计算点击的元素距离屏幕的位置
    getElPos: function (el) {
      this.$refs.shoppingCart.dropDown(el)
    },
    foodDetailShow: function (food) {
      this.selectedFood = food
      this.showFoodDetail = true
    }
  },
  components: {
    supports,
    shoppingCart,
    cartControl,
    food
  }
}
</script>

<style lang="less">
@import "../../common/style/index.less";

.goods {
  display: flex;
  position: absolute;
  top: 176px;
  bottom: 46px;
  width: 100%;

  .menu-wrapper {
    flex: 0 0 80px;
    overflow: hidden;

    .menu {

      li {
        display: table;
        width: 80px;
        height: 54px;
        padding: 0 12px;
        font-size: 12px;
        color: #666;
        box-sizing: border-box;
        background-color: #f3f5f7;

        &.current {
          margin-top: -1px;
          color: #07111b;
          background-color: #fff;
        }

        .menu_item {
          display: table-cell;
          vertical-align: middle;
          line-height: 14px;
          .border-1px(bottom, rgba(7, 17, 27, 0.1));
        }
      }
    }

  }

  .foods-wrapper {
    flex: 1;
    box-sizing: border-box;
    overflow: hidden;

    .foods {

      h4 {
        padding: 7px 0 5px 14px;
        font-size: 12px;
        color: #93999f;
        border-left: 2px solid #d9dde1;
        background-color: #f3f5f7;
      }

      ul {
        padding: 0 18px;
        background-color: #fff;

        li {
          position: relative;
          display: flex;
          padding: 18px 0;
          .border-1px(bottom, rgba(7, 17, 27, .1));

          &:last-child {
            &:after {
              display: none;
            }
          }

          .pic {
            flex-shrink: 0;
            width: 57px;
            height: 57px;

            img {
              width: 100%;
              height: 100%;
            }

          }

          .txt {
            flex: 1;
            width: 80%;
            padding-left: 10px;
            box-sizing: border-box;

            .name {
              width: 95%;
              margin-top: 2px;
              font-size: 14px;
              line-height: 14px;
              color: #07111b;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .desc {
              width: 95%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .desc,
            .sellCount {
              margin-top: 8px;
              font-size: 10px;
              color: #93999f;

              span {
                padding-left: 12px;

                &:first-child {
                  padding-left: 0;
                }

              }

            }

            .price {
              margin-top: 4px;

              .new {
                font-size: 14px;
                color: #f01414;
                font-weight: normal;
                line-height: 24px;
              }

              .old {
                font-size: 10px;
                color: #93999f;
                font-weight: normal;
                line-height: 24px;
              }

            }

            .cart-control {
              position: absolute;
              right: 0;
              bottom: 18px;
            }

          }

        }

      }

    }

  }

  .move-enter, .move-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .move-enter-active, .move-leave-active {
    transition: all .3s ease-in-out;
  }

}
</style>
