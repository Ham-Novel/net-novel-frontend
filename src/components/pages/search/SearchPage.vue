<template>
    <main>
        <section class="search-input">
            <div class="base-wrapper">
                <SearchBar></SearchBar>
            </div>
        </section>
        <section class="search-result">
            <div class="base-wrapper">
                <SearchResult></SearchResult>
            </div>
        </section>
    </main>
</template>

<script setup>
import { onMounted } from "vue";
import SearchBar from "./SearchBar.vue";
import SearchResult from "./SearchResult.vue";

import { novelApi } from "@/hooks/backendApi";

const searchNovel = async (page, size) => {
    const loadNovels = await novelApi.getSearchNovels("제목", "title", 0, 10);
};

onMounted(async () => {
    const data = await searchNovel();
    console.log(data);
});
</script>

<style scoped lang="sass">
@use '@/assets/base.sass'

.search-input
    > div
        padding-top: 30px
        padding-bottom: 30px
</style>
