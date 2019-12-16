<template>
  <div id="index">
    <Menu></Menu>
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
