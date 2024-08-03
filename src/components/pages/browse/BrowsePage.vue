<template>
    <main>
        <div class="browse-feature">
            <div class="feature-divider base-wrapper">
                <BrowseFilter class="filter-by"></BrowseFilter>
                <BrowseSort class="sort-by"></BrowseSort>
            </div>
        </div>
        <section class="browse-result">
            <div class="browse-novel-list base-wrapper base-distance">
                <NovelListItem
                    v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]"
                ></NovelListItem>
            </div>
        </section>
    </main>
</template>

<script setup>
import NovelListItem from "@/components/reusable/NovelListItem.vue";
import BrowseFilter from "./BrowseFilter.vue";
import BrowseSort from "./BrowseSort.vue";
import { markRaw, ref } from "vue";
</script>

<style lang="sass" scoped>
@use "@/assets/base.sass"

.browse-feature
    display: relative

.feature-divider
    height: 200px
    display: flex
    flex-flow: row wrap

    .filter-by
        flex: 1
        padding: 30px

    .sort-by
        flex: 1
        padding: 30px


.browse-novel-list
    padding-top: 30px
    display: flex
    justify-content: flex-start
    flex-flow: column wrap
    gap: 30px

.line
  border-top: 1px solid #444444
  margin: 10px 0px
</style>
