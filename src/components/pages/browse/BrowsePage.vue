<template>
    <div class="browse-feature">
        <div class="feature-divider base-wrapper">
            <BrowseFilter class="filter-by"></BrowseFilter>
            <BrowseSort class="sort-by"></BrowseSort>
        </div>
    </div>
    <section class="browse-result">
        <div class="browse-content base-wrapper base-distance">
            <InfiniteScroll class="browse-novel-list" v-bind="scrollProps">
                <template #default="{ item }">
                    <BrowseListItem :novel="item"></BrowseListItem>
                </template>
            </InfiniteScroll>
        </div>
    </section>
</template>

<script setup>
import BrowseListItem from "./BrowseListItem.vue";
import BrowseFilter from "./BrowseFilter.vue";
import BrowseSort from "./BrowseSort.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";

import { novelApi } from "@/hooks/backendApi";
import { reactive } from "vue";

//스크롤 페이지 로드 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 10 },
    loadMethod: async (page, size) => {
        const loadData = await novelApi.getBrowseNovels(page, size);
        return loadData;
    },
    loadingMessage: "Browse Loading....",
});
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

.browse-content
    padding-top: 30px


.browse-novel-list
    display: flex
    justify-content: flex-start
    flex-flow: row wrap
    gap: 30px

.line
  border-top: 1px solid #444444
  margin: 10px 0px
</style>
