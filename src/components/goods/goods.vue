<template>
  <div class="goods">
    <div class="meau-wrapper">
      <ul class="meau">
        <li v-for="(good, index) in goods" :key="index">
          <p>
            <supports :size="1" :type="good.type" v-if="good.type!=-1"></supports>
            <span class="txt">{{good.name}}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <div class="foods">
        <div class="item" v-for="(good, index) in goods" :key="index">
          <h4>{{good.name}}</h4>
          <ul>
            <li v-for="(food, index) in good.foods" :key="index">
              <div class="pic">
                <img :src="food.image" alt="">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import supports from "components/supports/supports";
import { getGoods } from "api";
export default {
  name: "goods",
  data() {
    return {
      goods: []
    };
  },
  created() {
    this._getGoods();
  },
  methods: {
    _getGoods: function() {
      getGoods().then(goods => {
        this.goods = goods;
      });
    }
  },
  components: {
    supports
  }
};
</script>
<style lang="less">
@import "../../common/style/index.less";
.goods {
  display: flex;
  position: absolute;
  top: 0;
  height: 100%;
  padding-top: 348px;
  padding-bottom: 92px;
  box-sizing: border-box;

  .meau {
    overflow: hidden;

    li {
      display: table;
      // align-items: center;
      // justify-content: center;
      width: 160px;
      height: 108px;
      padding: 0 24px;
      font-size: 24px;
      color: #666;
      box-sizing: border-box;
      background-color: #f3f5f7;

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
</style>