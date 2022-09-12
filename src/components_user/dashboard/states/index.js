import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        my_rooms: []
    },
    mutations: {
        set_my_rooms(state, payload){
            state.my_rooms = [...payload]
        }
    },
    getters: {
        get_my_rooms : state => state.my_rooms
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
        }
    }
}