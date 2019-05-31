<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="menu">
        <li v-for="(good, index) in goods" :key="index" :class="{'current': currentIndex == index}"
          @click="selectMenu(index,$event)" ref="menuItem">
          <p>
            <supports :size="1" :type="good.type" v-if="good.type!=-1"></supports>
            <span class="txt">{{good.name}}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <div class="foods">
        <div class="item" ref="foodsItem" v-for="(good, index) in goods" :key="index">
          <h4>{{good.name}}</h4>
          <ul>
            <li v-for="(food, index) in good.foods" :key="index">
              <div class="pic">
                <img :src="food.image" alt="">
              </div>
              <div class="txt">
                <p class="name">{{food.name}}</p>
                <p class="desc" v-if="food.description"><span>{{food.description}}</span></p>
                <p class="sellCount"><span>月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span></p>
                <p class="price"><span class="new">￥{{food.price}}</span><span class="old"
                    v-if="food.oldPrice">￥{{food.oldPrice}}</span></p>
              </div>
              <div class="operate">
                <i class="iconfont icon-remove_circle_outline"></i>
                <span>1</span>
                <i class="iconfont icon-add_circle"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import supports from 'components/supports/supports'
  import BScroll from 'better-scroll'
  import {
    getGoods
  } from 'api'
  export default {
    name: 'goods',
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      }
    },
    computed: {
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
      }
    },
    created() {
      getGoods().then(goods => {
        this.goods = goods
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
        const foods_item = this.$refs.foodsItem
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foods_item.length; i++) {
          const item = foods_item[i]
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
      }
    },
    components: {
      supports
    }
  }

</script>
<style lang="less">
@import "../../common/style/index.less";

.goods {
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  padding-top: 349px;
  padding-bottom: 92px;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 1;

  .menu-wrapper {
    position: relative;
    flex: 0 0 160px;
    width: 160px;
    overflow: hidden;
    z-index: 1;

    .menu {

      li {
        display: table;
        width: 160px;
        height: 108px;
        padding: 0 24px;
        font-size: 24px;
        color: #666;
        box-sizing: border-box;
        background-color: #f3f5f7;

        &.current {
          margin-top: -1px;
          color: #07111b;
          background-color: #fff;
        }

        p {
          display: table-cell;
          vertical-align: middle;
          line-height: 28px;
          .border-1px(bottom, rgba(7, 17, 27, 0.1));
        }

        .icon {
          float: left;
          line-height: 28px;
        }

        .txt {
          overflow: hidden;
          line-height: 28px;
        }
      }
    }

  }

}

.foods-wrapper {
  width: 100%;
  margin-left: -160px;
  padding-left: 160px;
  box-sizing: border-box;
  overflow: hidden;

  .foods {
    overflow: hidden;

    h4 {
      padding: 15px 0 10px 28px;
      font-size: 24px;
      color: #93999f;
      border-left: 4px solid #d9dde1;
      background-color: #f3f5f7;
    }

    ul {
      padding: 0 36px;
      background-color: #fff;

      li {
        position: relative;
        display: flex;
        padding: 36px 0;
        .border-1px(bottom, rgba(7, 17, 27, .1));

        &:last-child {
          &:after {
            display: none;
          }
        }

        .pic {
          position: absolute;
          top: 36px;
          left: 0px;
          flex-shrink: 0;
          width: 114px;
          height: 114px;

          img {
            width: 100%;
            height: 100%;
          }

        }

        .txt {
          width: 100%;
          padding-left: 134px;
          box-sizing: border-box;

          .name {
            width: 95%;
            padding-top: 4px;
            ;
            font-size: 28px;
            line-height: 28px;
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
            padding-top: 16px;
            font-size: 20px;
            line-height: 20px;
            color: #93999f;

            span {
              padding-left: 24px;

              &:first-child {
                padding-left: 0;
              }

            }

          }

          .price {
            padding-top: 8px;

            .new {
              font-size: 28px;
              color: #f01414;
              font-weight: normal;
              line-height: 48px;
            }

            .old {
              font-size: 20px;
              color: #93999f;
              font-weight: normal;
              line-height: 48px;
            }

          }

        }

        .operate {
          position: absolute;
          right: 0;
          bottom: 36px;
          display: flex;
          align-self: flex-end;
          align-items: center;
          line-height: 48px;

          .iconfont {
            font-size: 40px;
            color: #00a0dc;
          }

          span {
            padding: 0 22px;
            font-size: 20px;
            color: #93999f;
          }

        }

      }

    }

  }

}

</style>
