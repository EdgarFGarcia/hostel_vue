import Vue from "vue"

export default{
    namespaced: true,
    state:{
        room_categories: [],
        rooms: []
    },
    mutations: {
        set_room_categories(state, payload){
            state.room_categories = [...payload]
        },
        set_rooms(state, payload){
            state.rooms = [...payload]
        }
    },
    getters: {
        get_room_categories : state => state.room_categories,
        get_rooms : state => state.rooms
    },
    actions: {
        async set_room_categories({commit}){
            // commit('set_room_categories', payload)
            await Vue.axios.get('admin/rooms/room_categories')
            .then(({data}) => {
                commit('set_room_categories', data.data)
            })
        },
        set_rooms({commit}, payload){
            commit('set_rooms', payload)
        }
    }
}