import { defineStore } from "pinia"

export const useDarkModeStore = defineStore('dark-mode', {
    state: () => ({
        isDarkMode: false,
    }),
    actions: {
        toggleMode() {
            this.isDarkMode = !this.isDarkMode
        },
    },
    persist: {
        key: 'net-novel-theme',
        storage: localStorage,
    }
})
