import { defineStore } from "pinia";

export const useBrowseTagStore = defineStore('brose-page', {
    state: () => ({
        searchTags: [],
        searchSort: "latest"
    }),
    actions: {
        getTagQuery() {
            if (this.searchTags.length === 0) {
                return undefined;
            }
            return this.searchTags.join(",");
        }
    }
})



