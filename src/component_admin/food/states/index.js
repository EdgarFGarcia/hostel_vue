import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        menu: [],
    },
    actions: {
        async fetch_menu({ commit }) {
            await Vue.axios.get('user/auth_user/get_all_food')
                .then(({ data }) => {
                    commit('set_menu', data)
                })
        },
        set_menu({ commit }, payload) {
            commit('set_menu', payload)
        },
    },
    mutations: {
        set_menu(state, payload) {
            state.menu = [...payload]
        },
    },
    getters: {
        get_menu: state => state.menu,
    }
}