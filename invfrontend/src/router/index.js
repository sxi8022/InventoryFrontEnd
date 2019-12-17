import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import inventory from '@/pages/inventory'
import material from '@/pages/material'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

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
          path: '/material',
          name: 'material',
          component: material
        }
      ]
    }
  ]
})
