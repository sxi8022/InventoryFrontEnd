import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import inventory from '@/pages/inventory'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '/inventory',
          name: 'inventory',
          component: inventory
        }
      ]
    }
  ]
})
