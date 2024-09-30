import { defineStore } from "pinia";

export const useEpisodePageStore = defineStore('episode-page', {
    state: () => ({
        currentMenu: null,
        episodeId: undefined,
        commentSortBy: "recent"
    })
})
