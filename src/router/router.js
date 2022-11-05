import Vue from "vue";
import VueRouter from "vue-router";

import Landing from '../components/Landing/router/index.js'
import AdminDashboard from '../component_admin/dashboard/router/index.js'
import RoomAdmin from '../component_admin/rooms/router/index.js'
import ProfileComponent from '../components_user/profile/router/index.js'
import AdminReservation from '../component_admin/reservations/router/index.js'
import ReportComponent from '../component_admin/reports/router/index.js'
import OrderComponent from '../component_admin/orders/router/index.js'

/**
 * user routes
 */
import UserDashboard from '../components_user/dashboard/router/index.js'
import FoodRoutes from '../components_user/food/router/index.js'
/**
 * end user routes
 */


Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        ...Landing,
        ...UserDashboard,
        ...AdminDashboard,
        ...RoomAdmin,
        ...ProfileComponent,
        ...AdminReservation,
        ...FoodRoutes,
        ...ReportComponent,
        ...OrderComponent
    ]
});