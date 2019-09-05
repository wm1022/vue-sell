<template>
  <div class="rating-filter">
    <div class="filter">
      <span class="blue" :class="{active: active === 2}" @click="select(2)">全部<small>{{ratings.length}}</small></span>
      <span class="blue" :class="{active: active === 0}" @click="select(0)">推荐<small>{{ratingsRecommend}}</small></span>
      <span class="gray" :class="{active: active === 1}" @click="select(1)">吐槽<small>{{ratings.length-ratingsRecommend}}</small></span>
    </div>
    <div class="switch" :class="{on: isOnlyContent}" @click="onlyContent">
      <span class="iconfont icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const DEFAULT_FILTER = 2
export default {
  name: 'ratingFilter',
  props: {
    ratings: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      active: DEFAULT_FILTER,
      isOnlyContent: false
    }
  },
  computed: {
    ratingsRecommend () {
      let ratings = this.ratings
      let count = 0
      for (let i = 0; i < ratings.length; i++) {
        if (ratings[i].rateType === 0) {
          count++
        }
      }
      return count
    }
  },
  methods: {
    select (rateType) {
      if (this.active !== rateType) {
        this.$emit('ratingsFilter', rateType)
        this.active = rateType
      }
    },
    onlyContent () {
      this.isOnlyContent = !this.isOnlyContent
      this.$emit('onlyContent', this.isOnlyContent)
    }
  }
}
</script>

<style lang="less">
@import '~common/style/mixin';
.rating-filter {

  .filter {
    padding: 18px;
    .border-1px(bottom, rgba(7, 17, 27, 0.1));
    font-size: 0;

    span {
      display: inline-block;
      padding: 8px 12px;
      margin-right: 8px;
      line-height: 16px;
      border-radius: 1px;
      font-size: 12px;
      color: rgb(77, 85, 93);

      &.blue {
        background-color: rgba(0, 160, 220, .2);

        &.active {
          background: rgb(0, 160, 220);
        }

      }

      &.gray {
        background-color: rgba(77, 85, 93, .2);

        &.active {
          background: rgb(77, 85, 93);
        }

      }

      &.active {
        color: #fff;
      }
          
    }

  }

  .switch {
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    color: rgb(147, 153, 159);
    font-size: 0;

    .icon-check_circle {
      color: #999;
    }

    &.on .icon-check_circle {
      color: #00c850;
    }
     
    .icon-check_circle {
      display: inline-block;
      vertical-align: top;
      margin-right: 4px;
      font-size: 24px;
    }
      
    .text {
      display: inline-block;
      vertical-align: top;
      font-size: 12px;
    }
      
  }
      

}
</style>
