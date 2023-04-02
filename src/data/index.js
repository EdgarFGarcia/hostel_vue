import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

/**
 * imports from app
 */
import RoomState from '../components/Landing/states/index.js'
import AuthState from '../components/Auth/states/index.js'
import UserState from '../components_user/dashboard/states/index.js'
import UserProfileState from '../components_user/profile/states/index.js'

/**
 * Admin state management
 */
import AdminRooms from '../component_admin/rooms/states/index.js'
import AdminReservation from '../component_admin/reservations/states/index.js'
import AdminReports from '../component_admin/reports/state/index.js'
import AdminUsers from '../component_admin/users/states/index.js'
import Messages from '../component_admin/messages/states/index.js'

import HomeTab from './states/index.js'

/**
 * end import from app
 */

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        room:               RoomState,
        auth:               AuthState,
        user:               UserState,
        user_profile:       UserProfileState,
        admin_reservation:  AdminReservation,
        admin_room:         AdminRooms,
        admin_report:       AdminReports,
        home_tab:           HomeTab,
        admin_users:        AdminUsers,
        admin_messages:     Messages,
    },
    plugins: [createPersistedState()]
});