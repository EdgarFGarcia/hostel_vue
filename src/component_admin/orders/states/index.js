import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        orders: [],
    },
    actions: {
        async fetch_orders({ commit }) {
            await Vue.axios.get('admin/orders/get_all_orders')
                .then(({ data }) => {
                    commit('set_orders', data)
                })
        },
        set_orders({ commit }, payload) {
            commit('set_orders', payload)
        },
    },
    mutations: {
        set_orders(state, payload) {
            state.orders = [...payload]
        },
    },
    getters: {
        get_orders: state => state.orders,
    }
}