import Vue from 'vue'

export default{
    namespaced: true,
    state: {
        reservation_list: [],
        sales: [],
        check_list: [],
        room_information: {},
        requests: [],
        selected_room: null
    },
    actions: {
        async fetch_reservations({commit}){
            await Vue.axios.get('admin/reservation/bookings')
            .then(({data}) => {
                commit('set_reservation_list', data.data)
            })
        },
        async fetch_sales({commit}){
            await Vue.axios.get('admin/reservation/bookings_sales')
            .then(({data}) => {
                commit('set_sales', data.data)
            })
        },
        async fetch_check_list({commit}){
            await Vue.axios.get('admin/reservation/g_check_list')
            .then(({data}) => {
                commit('set_check_list', data.data)
            })
        },
        async fetch_requests({commit}){
            await Vue.axios.get('admin/reservation/requests')
            .then(({data}) => {
                commit('set_requests', data.data)
            })
        },
        set_room_information({commit}, payload){
            commit('set_room_information', payload)
        },
        set_check_list({commit}, payload){
            commit('set_check_list', payload)
        },
        set_reservations({commit}, payload){
            commit('set_reservation_list', payload)
        },
        set_sales({commit}, payload){
            commit('set_sales', payload)
        },
        set_requests({commit}, payload){
            commit('set_requests', payload)
        },
        set_selected_room({ commit }, payload) {
            commit('set_selected_room', payload)
        },
    },
    mutations: {
        set_reservation_list(state, payload){
            state.reservation_list = [...payload]
        },
        set_sales(state, payload) {
            state.sales = [...payload]
        },
        set_check_list(state, payload) {
            state.check_list = [...payload]
        },
        set_requests(state, payload) {
            state.requests = [...payload]
        },
        set_room_information(state, payload){
            state.room_information = payload
        },
        set_selected_room(state, payload) {
            state.selected_room = payload
        }
    },
    getters: {
        get_reservation_list : state => state.reservation_list,
        get_sales : state => state.sales,
        get_check_list : state => state.check_list,
        get_requests : state => state.requests,
        get_room_information: state => state.room_information,
        get_selected_room: state => state.selected_room
    }
}