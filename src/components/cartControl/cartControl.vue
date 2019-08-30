<template>
  <div class="cart-control">
    <transition name="move">
      <i class="iconfont icon-remove_circle_outline" v-show="this.food.count" @click="removeFood"></i>
    </transition>
    <span class="count" v-show="this.food.count">{{this.food.count}}</span>
    <i class="iconfont icon-add_circle" @click="addFood"></i>
  </div>
</template>

<script>
export default {
  name: 'cartControl',
  props: {
    food: {
      type: Object
    },
    animate: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    addFood () {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      //触发购物车小球动画
      this.$emit('shoppingCartAnimate', event.target)
    },
    removeFood () {
      if (this.food.count > 0) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="less">
.cart-control {
  display: flex;
  align-self: flex-end;
  align-items: center;
  line-height: 24px;

  .move-enter-active, .move-leave-active {
    transition: all .5s;
  }

  .move-enter, .move-leave-to {
    opacity: 0;
    transform: translate3d(25px, 0, 0) rotate(90deg);
  }

  .iconfont {
    display: inline-block;
    font-size: 20px;
    color: #00a0dc;
  }

  .count {
    padding: 0 11px;
    font-size: 10px;
    color: #93999f;
  }

}
</style>
