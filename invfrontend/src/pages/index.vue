<template>
  <div style="width:100%; height:100%; position:fixed" >
    <div style="height:10%; width:100%">
      <div>
        {{title}}
      </div>
    </div>
    <div style="height:90%; width:100%;">
      <div style="height:100%;width:30%; float:left;">
        <Menu></Menu>
      </div>
      <div style="height:100%; width:70%;">

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
