import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

/**
 * imports from app
 */
import RoomState from '../components/Landing/states/index.js'
import AuthState from '../components/Auth/states/index.js'
import UserState from '../components_user/dashboard/states/index.js'
import AdminRoomState from '../component_admin/rooms/states/index.js'

/**
 * end import from app
 */

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        room:           RoomState,
        auth:           AuthState,
        user:           UserState,
        admin_room:     AdminRoomState
    },
    plugins: [createPersistedState()]
});