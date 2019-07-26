<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass, index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
  </div>
</template>
<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  props: {
    'size': Number,
    'score': Number
  },
  computed: {
    starType: function () {
      return `star-${this.size}`
    },
    itemClasses: function () {
      const result = []
      const score = Math.floor(this.score * 2) / 2 // 将score变为n或者n.5
      const hasDecimal = score % 1 !== 0
      const integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../common/style/index.less';
.star {

  &.star-24 {

    .star-item {
      display: inline-block;
      width: 12px;
      height: 12px;

      &.on {
        .bg-image('../../common/images/star24_on')
      }

      &.half {
        .bg-image('../../common/images/star24_half')
      }

      &.off {
        .bg-image('../../common/images/star24_off')
      }

    }

  }

  &.star-36 {

    .star-item {
      display: inline-block;
      width: 18px;
      height: 18px;

      &.on {
        .bg-image('../../common/images/star36_on')
      }

      &.half {
        .bg-image('../../common/images/star36_half')
      }

      &.off {
        .bg-image('../../common/images/star36_off')
      }

    }

  }

  &.star-48 {

    .star-item {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin: 0 12px;

      &.on {
        .bg-image('../../common/images/star48_on')
      }

      &.half {
        .bg-image('../../common/images/star48_half')
      }

      &.off {
        .bg-image('../../common/images/star48_off')
      }

    }

  }

}
</style>
