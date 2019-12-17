// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'
import { Calendar } from '@progress/kendo-dateinputs-vue-wrapper'

Vue.config.productionTip = false

Vue.component(Calendar.name, Calendar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, Calendar },
  template: '<App/>'
})
