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
import SearchBar from "./SearchBar.vue";
import SearchResult from "./SearchResult.vue";
</script>

<style scoped lang="sass">
@use '@/assets/base.sass'

.search-input
    > div
        padding-top: 30px
        padding-bottom: 30px
</style>
