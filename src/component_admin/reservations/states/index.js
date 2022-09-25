import Vue from 'vue'

export default{
    namespaced: true,
    state: {
        reservation_list: []
    },
    actions: {
        async fetch_reservations({commit}){
            await Vue.axios.get('admin/reservation/g_reservation')
            .then(({data}) => {
                commit('set_reservation_list', data.data)
            })
        }
    },
    mutations: {
        set_reservation_list(state, payload){
            state.reservation_list = [...payload]
        }
    },
    getters: {
        get_reservation_list : state => state.reservation_list
    }
}