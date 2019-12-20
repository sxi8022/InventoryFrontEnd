<template>
  <div style="width:100%; height:100%; position:fixed" >
    <div>
      <span><h1>재고관리 홈페이지</h1></span>
    </div>
    <div style="height:100%; width:100%;">
      <div style="height:100%;width:15%; float:left;">
        <Menu></Menu>
      </div>
      <div style="height:100%; width:85%; float:left">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '../components/Menu.vue'

export default {
  name: 'index',
  components: {
    'Menu': Menu
  },
  data () {
    return {
      title: 'INVENTORY MANAGER'
    }
  }
}
</script>
