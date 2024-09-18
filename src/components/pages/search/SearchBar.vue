<template>
    <div class="search-bar">
        <SearchSwitch class="mode-switch"></SearchSwitch>
        <input type="text" placeholder="작품명, 작가명 검색" />
        <Search />
        <List />
    </div>
</template>

<script setup>
import SearchSwitch from "./SearchSwitch.vue";
import { Search, List } from "lucide-vue-next";
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
</style>
