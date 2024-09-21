<template>
    <div>
        <template v-for="item in [1, 2, 3]">
            <SearchNovelItem></SearchNovelItem>
            <div class="line"></div>
        </template>
        <!-- <InfiniteScroll v-bind="scrollProps" ref="scrollRef">
            <template #default="{ item }">
                <SearchNovelItem :novel="item"></SearchNovelItem>
                <div class="line"></div>
            </template>
        </InfiniteScroll> -->
    </div>
</template>

<script setup>
import SearchNovelItem from "./SearchNovelItem.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";

import { novelApi } from "@/hooks/backendApi";
import { computed, reactive, ref, toRaw, watch } from "vue";
import { useRoute } from "vue-router";

//스크롤 페이지 로드 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 5 },
    loadMethod: async (page, size) => {
        
        return loadData;
    },
});

//댓글 리스트 초기화 메서드
const scrollRef = ref(null);
const reloadBrowseList = () => {
    console.debug("[BROWSE] realod: ", tags.value);
    scrollRef.value.reset();
};
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
