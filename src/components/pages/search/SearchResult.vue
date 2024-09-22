<template>
    <div>
        <InfiniteScroll v-bind="scrollProps" ref="scrollRef">
            <template #default="{ item }">
                <SearchNovelItem :novel="item"></SearchNovelItem>
                <div class="line"></div>
            </template>
        </InfiniteScroll>
    </div>
</template>

<script setup>
import SearchNovelItem from "./SearchNovelItem.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";

import { novelApi } from "@/hooks/backendApi";
import { useSearchStore } from "@/stores/searchStore";
import { computed, reactive, ref } from "vue";

const searchStore = useSearchStore();
const didSearch = ref(false);

//스크롤 페이지 로드 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 3 },
    loadMethod: async (page, size) => {
        const loadNovels = await novelApi.getSearchNovels(
            searchStore.getWord,
            searchStore.getType,
            page,
            size
        );
        return loadNovels;
    },
});

//스크롤 리부팅 메서드
const scrollRef = ref(null);
const reloadSearchResult = () => {
    console.debug("[SEARCH] realod: ");
    scrollRef.value.reset();
};

searchStore.setSearchMethod(() => {
    didSearch.value = true;
    reloadSearchResult();
});
</script>

<style lang="sass" scoped>
@use "@/assets/base.sass"

.browse-feature
    position: relative

.feature-divider
    height: 200px
    display: flex
    flex-flow: row wrap
    align-items: stretch

    .filter-by
        flex: 1
        padding: 15px
        margin: 15px

    .sort-by
        flex: 1
        padding: 15px
        margin: 15px


.browse-novel-list
    padding-top: 30px
    display: flex
    justify-content: flex-start
    flex-flow: row wrap

.line
    border-top: 2px solid var(--line-color)
    width: 100%
    margin: 10px 0px
</style>
