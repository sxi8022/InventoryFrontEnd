import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import stock from '@/pages/stock'
import ipgo from '@/pages/ipgo'
import chulgo from '@/pages/chulgo'
import material from '@/pages/material'
import invgroup from '@/pages/invgroup'
import login from '@/pages/login'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: index,
      children: [
        {
          path: '/',
          name: 'login',
          component: login
        },
        {
          path: '/stock',
          name: 'stock',
          component: stock
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
          path: '/material',
          name: 'material',
          component: material
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
