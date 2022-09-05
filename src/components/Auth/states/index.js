export default{
    namespaced: true,
    state: {
        user: {}
    },
    mutations: {
        set_user(state, payload){
            state.user = payload
        },
        clear_user_state(state){
            state.user = {}
        }
    },
    getters: {
        get_user : state => state.user
    },
    actions: {
        set_user({commit}, payload){
            commit('set_user', payload)
        }
    }
}