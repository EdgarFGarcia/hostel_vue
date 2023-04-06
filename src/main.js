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
import VuetifyTimeSelect from 'vuetify-time-select'
import VueFbCustomerChat from 'vue-fb-customer-chat'
import VCalendar from 'v-calendar';

Vue.component('default-layout', Default)
Vue.component('user_dashboard-layout', UserDashboard)
Vue.component('admin_dashboard-layout', AdminDashboard)

Vue.config.productionTip = false

Vue.use(axios)
Vue.use(Vue2Filters)
Vue.use(require('moment'))
Vue.component('vuetify-time-select', VuetifyTimeSelect)
Vue.use(VueFbCustomerChat, {
  page_id: '102684835743499', //  change 'null' to your Facebook Page ID,
  theme_color: '#333333', // theme color in HEX
  locale: 'en_US', // default 'en_US'
});
Vue.use(VCalendar, {
  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
});


new Vue({
  router,
  store,
  vuetify,
  moment,
  render: h => h(App)
}).$mount('#app')
