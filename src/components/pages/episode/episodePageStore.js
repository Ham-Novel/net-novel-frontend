import { defineStore } from "pinia";

export const useEpisodePageStore = defineStore('episode-page', {
    state: () => ({
        currentMenu: null,
        novelId: undefined,
        episodeId: undefined,
        commentSortBy: "likes"
    })
})
