export default{
    namespaced: true,
    state: {
        user: {},
        snackbar: {
            show: false,
            message: "",
            button: false,
        },
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
        },
        setMessage(state, v) {
            state.snackbar.show = v.show
            state.snackbar.message = v.message
            state.snackbar.button = v.button
        },
    },
    getters: {
        get_user : state => state.user,
        get_user_data: state => state.user.udata,
        mSnackbar(state) {
            return state.snackbar
        },
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