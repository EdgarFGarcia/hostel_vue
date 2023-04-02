import Vue from "vue"

export default {
    namespaced: true,
    state: {
        room_types: []
    },
    actions: {
        async fetch_room_types({ commit }) {
            await Vue.axios.get('admin/rooms/room_categories')
                .then(({ data }) => {
                    console.log(data)
                    commit('set_room_types', data.data)
                })
        },
        set_room_types({ commit }, payload) {
            commit('set_room_types', payload)
        },
    },
    mutations: {
        set_room_types(state, payload) {
            state.room_types = [...payload]
        },
    },
    getters: {
        get_room_types: state => state.room_types,
    },
}