<template>
    <div class="search-bar">
        <SearchSwitch class="mode-switch" v-model="type"></SearchSwitch>
        <input
            @keyup.enter="searchEvent"
            type="text"
            placeholder="작품명, 작가명 검색"
            v-model="word"
        />
        <Search class="execute-search button" @click="searchEvent" stroke-width="2.5" size="28" />
        <List class="detail-search button" stroke-width="2.5" size="30" />
    </div>
</template>

<script setup>
import SearchSwitch from "./SearchSwitch.vue";
import { Search, List } from "lucide-vue-next";
import { computed, ref } from "vue";
import { useSearchStore } from "@/stores/searchStore";

const searchStore = useSearchStore();

const type = computed({
    get: () => searchStore.getType,
    set: (value) => (searchStore.type = value),
});

const word = computed({
    get: () => searchStore.getWord,
    set: (value) => (searchStore.word = value),
});

function searchEvent() {
    searchStore.triggerSearch();
}
</script>

<style scoped lang="sass">
.search-bar
    padding: 20px
    aspect-ratio: 15 / 1
    border: 2px solid var(--primary-color)

    display: flex
    align-items: center
    gap: 20px

    .mode-switch
        width: 60px

    input
        flex: 1
        width: 100%
        height: 30px
        border: none
        font-size: 16px

.button
    cursor: pointer
    &:hover
        color: var(--primary-color)
</style>
