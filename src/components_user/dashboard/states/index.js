import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        my_rooms: [],
        payable_data: {},
        payment_details: {}
    },
    mutations: {
        set_my_rooms(state, payload){
            state.my_rooms = [...payload]
        },
        set_payable_data(state, payload){
            state.payable_data = payload
        },
        set_payment_details(state, payload) {
            state.payment_details = payload
        }
    },
    getters: {
        get_my_rooms : state => state.my_rooms,
        get_payable_data : state => state.payable_data,
        get_payment_details: state => state.payment_details
    },
    actions: {
        async set_my_rooms({commit}){
            // commit('set_my_rooms')
            await Vue.axios.get('/r/rooms/fetch_room_data')
            .then(({data}) => {
                if(data.response){
                    commit('set_my_rooms', data.data)
                }
            })
        },
        set_payable_data({commit}, payload){
            commit('set_payable_data', payload)
        },
        set_payment_details({commit}, payload){
            commit('set_payment_details', payload)
        }
    }
}