export default {
    namespaced: true,
    state: () => ({
        darkMode: false
    }),
    mutations: {
        toggle(state) {
            state.naviState = !state.naviState
        },
        off(state) {
            state.naviState = false
        },
        on(state) {
            state.naviState = true
        }
    },
    getters: {
        isActivate: (state) => state.naviState
    }
}