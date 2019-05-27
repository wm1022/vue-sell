<template>
	<div class="goods">
    <ul class="meau">
      <li v-for="(good, index) in goods" :key="index">
        <supports :size="1" :type="good.type"></supports>
        {{good.name}}
      </li>
    </ul>
  </div>
</template>
<script>
import supports from 'components/supports/supports'
import {getGoods} from 'api'
export default {
  name: 'goods',
  data () {
    return {
      goods: []
    }
  },
  created () {
    this._getGoods()
  },
  methods: {
    _getGoods: function () {
      getGoods().then((goods) => {
        this.goods = goods
      })
    }
  },
  components: {
    supports
  }
}
</script>
<style lang="less" scoped>
</style>