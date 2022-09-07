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
        get_user : state => state.user,
        get_user_data: state => state.user.udata
    },
    actions: {
        set_user({commit}, payload){
            commit('set_user', payload)
        }
    }
}