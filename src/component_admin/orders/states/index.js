import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        orders: [],
        paid_orders: [],
        paid_transpo: [],
        paid_massage: [],
        transpo: [],
        massage: [],
        user_orders: []
    },
    actions: {
        async fetch_orders({ commit }) {
            await Vue.axios.get('admin/orders/get_all_orders')
                .then(({ data }) => {
                    commit('set_orders', data.food)
                    commit('set_transpo', data.transpo)
                    commit('set_massage', data.massage)
                })
        },
        async fetch_paid_orders({ commit }) {
            await Vue.axios.get('admin/orders/get_all_paid_orders')
                .then(({ data }) => {
                    commit('set_paid_orders', data.food)
                    commit('set_paid_transpo', data.transpo)
                    commit('set_paid_massage', data.massage)
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
        set_paid_orders({ commit }, payload) {
            commit('set_paid_orders', payload)
        },
        set_paid_transpo({ commit }, payload) {
            commit('set_paid_transpo', payload)
        },
        set_paid_massage({ commit }, payload) {
            commit('set_paid_massage', payload)
        },
        set_transpo({ commit }, payload) {
            commit('set_transpo', payload)
        },
        set_massage({ commit }, payload) {
            commit('set_massage', payload)
        },
        set_user_orders({ commit }, payload) {
            commit('set_user_orders', payload)
        },
    },
    mutations: {
        set_orders(state, payload) {
            state.orders = [...payload]
        },
        set_paid_orders(state, payload) {
            state.paid_orders = [...payload]
        },
        set_paid_transpo(state, payload) {
            state.paid_transpo = [...payload]
        },
        set_paid_massage(state, payload) {
            state.paid_massage = [...payload]
        },
        set_transpo(state, payload) {
            state.transpo = [...payload]
        },
        set_massage(state, payload) {
            state.massage = [...payload]
        },
        set_user_orders(state, payload) {
            state.user_orders = [...payload]
        },
    },
    getters: {
        get_orders: state => state.orders,
        get_paid_orders: state => state.paid_orders,
        get_paid_transpo: state => state.paid_transpo,
        get_paid_massage: state => state.paid_massage,
        get_transpo: state => state.transpo,
        get_massage: state => state.massage,
        get_user_orders: state => state.user_orders,
    }
}