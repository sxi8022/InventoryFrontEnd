<template>
  <div>
    <ul>
      <li id="logo">
        <div>Inventory</div>
        <div>Manager</div>
      </li>
      <li v-for="list in linklist" :key="list.content">
        <router-link :to="list.link" >{{ list.content }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      linklist: [
        {content: 'HOME', link: '/home'},
        {content: 'MANAGER', link: '/manager'},
        {content: 'Inventory', link: '/inventory'},
        {content: 'RESISTER', link: '/resister'}
      ]
    }
  },
  created () {
  },
  methods: {

  }
}
</script>

<style>
</style>
