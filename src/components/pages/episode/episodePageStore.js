import { defineStore } from "pinia";

export const useEpisodePageStore = defineStore('episode-page', {
    state: () => ({
        currentMenu: null,
        episodeId: undefined
    })
})


//     state: () => ({
//         isDarkMode: false,
//     }),
//     actions: {
//         toggleMode() {
//             this.isDarkMode = !this.isDarkMode
//         },
//     },
//     persist: {
//         key: 'net-novel-theme',
//         storage: localStorage,
//     }
