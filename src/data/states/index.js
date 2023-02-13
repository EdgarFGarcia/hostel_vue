export default{
    namespaced: true,
    state: {
        tab: null
    },
    mutations: {
        set_tab(state, payload){
            state.tab = payload
        },
    },
    getters: {
        get_tab : state => state.tab,
    },
    actions: {
        set_tab({commit}, payload){
            commit('set_tab', payload)
        }
    }
}