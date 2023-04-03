import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        actual_rooms: [],
    },
    actions: {
        async fetch_actual_rooms({ commit }) {
            await Vue.axios.get('admin/rooms/get_all_actual_rooms')
                .then(({ data }) => {
                    commit('set_actual_rooms', data.data)
                })
        },
        set_actual_rooms({ commit }, payload) {
            commit('set_actual_rooms', payload)
        },
    },
    mutations: {
        set_actual_rooms(state, payload) {
            state.actual_rooms = [...payload]
        },
    },
    getters: {
        get_actual_rooms: state => state.actual_rooms,
    }
}