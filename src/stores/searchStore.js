import { defineStore } from "pinia"

export const useSearchStore = defineStore('search', {
    state: () => ({
        word: "",
        type: "title",
        searchMethod: () => {
            console.error("search 이벤트의 trigger method가 정의되어 있지 않습니다.")
        }
    }),
    actions: {
        setSearchMethod(method) {
            this.searchMethod = method;
        },
        triggerSearch() {
            this.searchMethod();
        }
    },
    getters: {
        getWord() {
            return this.word
        },
        getType() {
            return this.type
        },
    }
})