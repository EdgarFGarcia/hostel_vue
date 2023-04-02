import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        orders: [],
        user_orders: []
    },
    actions: {
        async fetch_orders({ commit }) {
            await Vue.axios.get('admin/orders/get_all_orders')
                .then(({ data }) => {
                    commit('set_orders', data)
                })
        },
        async fetch_user_orders({ commit }) {
            await Vue.axios.get('admin/orders/get_orders')
                .then(({ data }) => {
                    commit('set_user_orders', data)
                })
        },
        set_orders({ commit }, payload) {
            commit('set_orders', payload)
        },
        set_user_orders({ commit }, payload) {
            commit('set_user_orders', payload)
        },
    },
    mutations: {
        set_orders(state, payload) {
            state.orders = [...payload]
        },
        set_user_orders(state, payload) {
            state.user_orders = [...payload]
        },
    },
    getters: {
        get_orders: state => state.orders,
        get_user_orders: state => state.user_orders,
    }
}