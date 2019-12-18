// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'
import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'
import { Calendar, DateinputsInstaller } from '@progress/kendo-dateinputs-vue-wrapper'
import { Grid, GridInstaller } from '@progress/kendo-grid-vue-wrapper'
import { DataSource, TreeListDataSource, DataSourceInstaller } from '@progress/kendo-datasource-vue-wrapper'
import VModal from 'vue-js-modal'
Vue.use(VModal, { dynamic: true })
Vue.config.productionTip = false
Vue.component(Calendar.name, Calendar)
Vue.use(GridInstaller)
Vue.use(DateinputsInstaller)
Vue.use(TreeListDataSource)
Vue.use(DataSourceInstaller)
Vue.use(VueMomentJS, moment)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App, Calendar, Grid, DataSource, VueMomentJS, moment},
  template: '<App/>'
})
