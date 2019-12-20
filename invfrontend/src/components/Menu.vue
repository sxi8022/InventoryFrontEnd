<template>
  <div>
    <ul>
      <li id="logo">
        <div>재고</div>
        <div>관리</div>
      </li>
      <li class="menulist" v-for="list in linklist" :key="list.content">
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
        {content: '홈', link: '/'},
        {content: '자재그룹', link: '/invgroup'},
        {content: '자재마스터', link: '/material'},
        {content: '입고', link: '/ipgo'},
        {content: '재고', link: '/stock'},
        {content: '출고', link: '/chulgo'}
      ]
    }
  },
  created () {
  },
  methods: {

  }
}
</script>

<style scoped>
#logo {font-size: 20px;}
.menulist {font-size: 20px;}
ul {list-style:none;}
</style>
