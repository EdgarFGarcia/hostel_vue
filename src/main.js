import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from './plugins/axios.js'
import router from './router/router'
import store from './data/index.js'
import Vue2Filters from 'vue2-filters'
import moment from 'moment'

import Default from './layouts/DefaultComponent.vue'
import UserDashboard from './layouts/UserDashboard.vue'
import AdminDashboard from './layouts/AdminLayout.vue'

Vue.component('default-layout', Default)
Vue.component('user_dashboard-layout', UserDashboard)
Vue.component('admin_dashboard-layout', AdminDashboard)

Vue.config.productionTip = false

Vue.use(axios)
Vue.use(Vue2Filters)
Vue.use(require('moment'))

new Vue({
  router,
  store,
  vuetify,
  moment,
  render: h => h(App)
}).$mount('#app')
