import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        users: [],
        admins: [],
        selected_user: {},
    },
    actions: {
        async fetch_users({ commit }) {
            await Vue.axios.get('admin/accounts/get_accounts')
                .then(({ data }) => {
                    commit('set_users', data.user)
                    commit('set_admins', data.admin)
                })
        },
        set_users({ commit }, payload) {
            commit('set_users', payload)
        },
        set_admins({ commit }, payload) {
            commit('set_admins', payload)
        },
        set_selected_user({ commit }, payload) {
            commit('set_selected_user', payload)
        },
    },
    mutations: {
        set_users(state, payload) {
            state.users = [...payload]
        },
        set_admins(state, payload) {
            state.admins = [...payload]
        },
        set_selected_user(state, payload) {
            state.selected_user = payload
        }
    },
    getters: {
        get_users: state => state.users,
        get_admins: state => state.admins,
        get_selected_user: state => state.selected_user
    }
}