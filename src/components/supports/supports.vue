<template>
  <span class="icon" :class="iconCls"></span>
</template>

<script>
  export default {
    props: {
      'size': Number,
      'type': Number
    },
    computed: {
      // 计算属性动态添加class
      iconCls() {
        const classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        return `icon_${this.size} ${classMap[this.type]}`
      }
    }
  }

</script>

<style lang="less" scoped>
@import '../../common/style/mixin';

.icon {
  display: inline-block;
  background-size: cover;
  vertical-align: -3px;

  &.icon_1 {
    width: 24px;
    height: 24px;

    &.decrease {
      .bg-image('../../common/images/decrease_1')
    }

    &.discount {
      .bg-image('../../common/images/discount_1')
    }

    &.special {
      .bg-image('../../common/images/special_1')
    }

    &.invoice {
      .bg-image('../../common/images/invoice_1')
    }

    &.guarantee {
      .bg-image('../../common/images/guarantee_1')
    }

  }

  &.icon_2 {
    width: 32px;
    height: 32px;

    &.decrease {
      .bg-image('../../common/images/decrease_2')
    }

    &.discount {
      .bg-image('../../common/images/discount_2')
    }

    &.special {
      .bg-image('../../common/images/special_2')
    }

    &.invoice {
      .bg-image('../../common/images/invoice_2')
    }

    &.guarantee {
      .bg-image('../../common/images/guarantee_2')
    }

  }

  &.icon_3 {
    width: 24px;
    height: 24px;

    &.decrease {
      .bg-image('../../common/images/decrease_3')
    }

    &.discount {
      .bg-image('../../common/images/discount_3')
    }

    &.special {
      .bg-image('../../common/images/special_3')
    }

    &.invoice {
      .bg-image('../../common/images/invoice_3')
    }

    &.guarantee {
      .bg-image('../../common/images/guarantee_3')
    }

  }

  &.icon_4 {
    width: 32px;
    height: 32px;

    &.decrease {
      .bg-image('../../common/images/decrease_4')
    }

    &.discount {
      .bg-image('../../common/images/discount_4')
    }

    &.special {
      .bg-image('../../common/images/special_4')
    }

    &.invoice {
      .bg-image('../../common/images/invoice_4')
    }

    &.guarantee {
      .bg-image('../../common/images/guarantee_4')
    }

  }

}

</style>
