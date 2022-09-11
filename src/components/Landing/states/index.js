import Vue from "vue"

export default{
    namespaced: true,
    state: {
        rooms_list: [],
        selected_room: {},
        reserve_this_room: {
            room: {},
            selected: {}
        }
    },
    mutations: {
        clear_reserve_this_room(state){
            state.reserve_this_room = {
                room: {},
                selected: {}
            }
        },
        set_rooms_list(state, payload){
            state.rooms_list = [...payload]
        },
        set_selected_room(state, payload){
            state.selected_room = payload
        },
        set_reserve_this_room(state, payload){
            state.reserve_this_room.room = payload
        },
        set_selected_room_for_reservation(state, payload){
            state.reserve_this_room.selected = payload
        },
        clear_selected_states(state){
            state.selected_room = {}
            state.reserve_this_room.room = {}
            state.reserve_this_room.selected = {}
        }
    },
    getters: {
        get_rooms_list : state => state.rooms_list,
        get_selected_room : state => state.selected_room,
        get_reserve_this_room : state => state.reserve_this_room.room,
        get_reserve_this_room_selected : state => state.reserve_this_room.selected
    },
    actions: {
        async fetch_rooms({commit}){
            // commit('set_rooms_list')
            await Vue.axios.get('/r/rooms/room_lists')
            .then(({data}) => {
                if(data.response){
                    commit('set_rooms_list', data.data)
                }
            })
        },
        set_selected_room({commit}, payload){
            commit('set_selected_room', payload)
        },
        set_reserve_this_room({commit}, payload){
            commit('set_reserve_this_room', payload)
        },
        set_selected_room_for_reservation({commit}, payload){
            commit('set_selected_room_for_reservation', payload)
        }
    }
}