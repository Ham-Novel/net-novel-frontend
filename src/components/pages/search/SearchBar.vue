<template>
    <section>
        <form role="search" class="search-input" @submit.prevent="searchEvent">
            <select class="search-type" v-model="searchType">
                <option value="title">제목</option>
                <option value="author">작가</option>
            </select>
            <input type="search" placeholder="작품명, 작가명 검색" v-model="word" />
            <input type="submit" />
        </form>
    </section>
</template>

<script setup>
import SearchSwitch from "./SearchSwitch.vue";
import { Search, List } from "lucide-vue-next";
import { computed, ref, watch } from "vue";
import { useSearchStore } from "@/stores/searchStore";

const searchStore = useSearchStore();

const searchType = computed({
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
.search-type
    width: 20%

section
    padding: 20px
</style>
