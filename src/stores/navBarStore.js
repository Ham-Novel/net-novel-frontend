import { defineStore } from "pinia"

export const useNavBarStore = defineStore('nav-bar', {
    state: () => ({
        display: true
    }),
    actions: {
        toggle() {
            this.display = !this.display
        },
        off() {
            this.display = false
        },
        on() {
            this.display = true
        }
    },
    getters: {
        isDisplayed: (state) => state.display
    }
})