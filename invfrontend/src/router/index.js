import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import inventory from '@/pages/inventory'
import ipgo from '@/pages/ipgo'
import chulgo from '@/pages/chulgo'
import invmaster from '@/pages/invmaster'
import invgroup from '@/pages/invgroup'
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
        },
        {
          path: '/ipgo',
          name: 'ipgo',
          component: ipgo
        },
        {
          path: '/chulgo',
          name: 'chulgo',
          component: chulgo
        },
        {
          path: '/invmaster',
          name: 'invmaster',
          component: invmaster
        },
        {
          path: '/invgroup',
          name: 'invgroup',
          component: invgroup
        }
      ]
    }
  ]
})
