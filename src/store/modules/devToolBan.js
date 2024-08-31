
export default {
    namespaced: true,
    state: () => ({
        isActivate: true
    }),
    mutations: {
        activate() {
            state.isActivate = true
        },
        deactivated() {
            state.isActivate = false
        },
    },
    getters: {
        state: (state) => state.isActivate
    },
}