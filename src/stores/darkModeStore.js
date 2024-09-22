import { defineStore } from "pinia"

export const useDarkModeStore = defineStore('dark-mode', {
    state: () => ({
        darkMode: false
    }),
    actions: {
        set(mode) {
            this.darkMode = mode;
        },
    },
    getters: {
        isActivate: (state) => state.darkMode
    }
})

// export default {
//     namespaced: true,
//     state: () => ({
//         darkMode: false
//     }),
//     mutations: {
//         toggle(state) {
//             state.naviState = !state.naviState
//         },
//         off(state) {
//             state.naviState = false
//         },
//         on(state) {
//             state.naviState = true
//         }
//     },
//     getters: {
//         isActivate: (state) => state.naviState
//     }
// }