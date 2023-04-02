import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        messages: [],
    },
    actions: {
        async fetch_messages({ commit }) {
            await Vue.axios.get('admin/messages/get_messages')
                .then(({ data }) => {
                    commit('set_messages', data.data)
                })
        },
        set_messages({ commit }, payload) {
            commit('set_messages', payload)
        },
    },
    mutations: {
        set_messages(state, payload) {
            state.messages = [...payload]
        },
    },
    getters: {
        get_messages: state => state.messages,
    }
}