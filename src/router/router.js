import Vue from "vue";
import VueRouter from "vue-router";

import Landing from '../components/Landing/router/index.js'
import UserDashboard from '../components_user/dashboard/router/index.js'
import AdminDashboard from '../component_admin/dashboard/router/index.js'
import RoomAdmin from '../component_admin/rooms/router/index.js'
import ProfileComponent from '../components_user/profile/router/index.js'
import AdminReservation from '../component_admin/reservations/router/index.js'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        ...Landing,
        ...UserDashboard,
        ...AdminDashboard,
        ...RoomAdmin,
        ...ProfileComponent,
        ...AdminReservation
    ]
});