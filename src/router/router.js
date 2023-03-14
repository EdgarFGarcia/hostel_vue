import Vue from "vue";
import VueRouter from "vue-router";

import Landing from '../components/Landing/router/index.js'
import AdminDashboard from '../component_admin/dashboard/router/index.js'
import RoomAdmin from '../component_admin/rooms/router/index.js'
import ProfileComponent from '../components_user/profile/router/index.js'
import Checkout from '../components_user/checkout/router/index.js'
import AdminReservation from '../component_admin/reservations/router/index.js'
import ReportComponent from '../component_admin/reports/router/index.js'
import HousekeepingComponent from '../component_admin/reservations/router/index.js'
import RequestComponent from '../component_admin/reservations/router/index.js'
import OrderComponent from '../component_admin/orders/router/index.js'
import OrderUserComponent from '../component_admin/orders/router/index.js'
import MessagesComponent from '../component_admin/messages/router/index.js'
import CreateAccount from '../component_admin/create_account/router/index.js'

/**
 * user routes
 */
import UserDashboard from '../components_user/dashboard/router/index.js'
import FoodRoutes from '../components_user/food/router/index.js'
import FoodRoutesAdmin from '../component_admin/food/router/index.js'
/**
 * end user routes
 */


Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        ...Landing,
        ...UserDashboard,
        ...AdminDashboard,
        ...RoomAdmin,
        ...ProfileComponent,
        ...AdminReservation,
        ...HousekeepingComponent,
        ...RequestComponent,
        ...FoodRoutes,
        ...FoodRoutesAdmin,
        ...ReportComponent,
        ...OrderComponent,
        ...OrderUserComponent,
        ...MessagesComponent,
        ...CreateAccount,
        ...Checkout
    ]
});

router.beforeEach((to, from, next) => {
    //list of blocked routes
    const protectedRoutes = ['/user_dashboard', '/admin_dashboard', '/admin_rooms', '/profile', '/admin_reservations', '/housekeeping',
        '/housekeeping_request', 'orders', 'orders_user', '/messages', '/create_account', '/checkout' ];
    //the route user is trying to access is in blocked routes list
    let token = JSON.parse(localStorage.getItem('vuex'))
    if (protectedRoutes.includes(to.path) && token.auth.user.token == null) {
        //redirect to route having unauhorised message page
        return next('/');
    }
    else {
        // otherwise allow user to access route
        return next();
    }
})

export default router