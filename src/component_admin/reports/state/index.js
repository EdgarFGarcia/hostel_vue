export default{
    namespaced: true,
    state: {
        pending_data: [],
        done_data: [],
        cancelled_data: []
    },
    actions: {
        set_pending_data({commit}, payload){
            commit('set_pending_data', payload)
        },
        set_done_data({commit}, payload){
            commit('set_done_data', payload)
        },
        set_cancelled_data({commit}, payload){
            commit('set_cancelled_data', payload)
        }
    },
    mutations: {
        set_pending_data(state, payload){
            state.pending_data = [...payload]
        },
        set_done_data(state, payload){
            state.done_data = [...payload]
        },
        set_cancelled_data(state, payload){
            state.cancelled_data = [...payload]
        }
    },
    getters: {
        get_pending_data : state => (value) => {
            if((value[0] !== undefined && value[1] !== undefined)){
                return state.pending_data.filter(q => {
                    return q.created_at >= value[0] && q.created_at <= value[1]
                })
            }
            return state.pending_data
        },
        get_done_data : state => (value) => {
            if((value[0] !== undefined && value[1] !== undefined)){
                return state.done_data.filter(q => {
                    return q.created_at >= value[0] && q.created_at <= value[1]
                })
            }
            return state.done_data
        },
        get_cancelled_data : state => (value) => {
            if((value[0] !== undefined && value[1] !== undefined)){
                return state.cancelled_data.filter(q => {
                    return q.created_at >= value[0] && q.created_at <= value[1]
                })
            }
            return state.cancelled_data
        }
    }
}