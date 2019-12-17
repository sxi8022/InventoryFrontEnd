<template>
  <div style="width:100%; height:100%; position:fixed" >
    <div style="height:100%; width:100%;">
      <div style="height:100%;width:30%; float:left;">
        <Menu></Menu>
      </div>
      <div style="height:100%; width:70%; padding-right:50px">
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
