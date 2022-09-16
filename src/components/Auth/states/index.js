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
        },
        update_user_information(state, payload){
            state.user.udata = payload
        }
    },
    getters: {
        get_user : state => state.user,
        get_user_data: state => state.user.udata
    },
    actions: {
        set_user({commit}, payload){
            commit('set_user', payload)
        },
        update_user_information({commit}, payload){
            commit('update_user_information', payload)
        }
    }
}