import Vue from 'vue'

export default{
    namespaced: true,
    state: {
        reservation_list: [],
        room_information: {}
    },
    actions: {
        async fetch_reservations({commit}){
            await Vue.axios.get('admin/reservation/g_reservation')
            .then(({data}) => {
                commit('set_reservation_list', data.data)
            })
        },
        set_room_information({commit}, payload){
            commit('set_room_information', payload)
        }
    },
    mutations: {
        set_reservation_list(state, payload){
            state.reservation_list = [...payload]
        },
        set_room_information(state, payload){
            state.room_information = payload
        }
    },
    getters: {
        get_reservation_list : state => state.reservation_list,
        get_room_information : state => state.room_information
    }
}