<template>
    <section class="browse-feature">
        <div class="feature-divider base-wrapper">
            <BrowseFilter
                class="filter-by"
                v-model="tags"
                @filter="reloadBrowseList"
            ></BrowseFilter>
            <BrowseSort class="sort-by"></BrowseSort>
        </div>
    </section>
    <section class="browse-result">
        <div class="browse-novel-list base-wrapper base-distance">
            <InfiniteScroll v-bind="scrollProps" ref="scrollRef">
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
import { onMounted, reactive, ref, toRaw } from "vue";

const sort = ref("view");
const tags = ref([]);

//스크롤 페이지 로드 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 5 },
    loadMethod: async (page, size) => {
        const loadData = await novelApi.getBrowseNovels(sort.value, page, size, toRaw(tags.value));
        return loadData;
    },
});

//댓글 리스트 초기화 메서드
const scrollRef = ref(null);
const reloadBrowseList = () => {
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
    gap: 20px

    .item
        padding-bottom: 5px
        border-bottom: 2px solid var(--line-color)

.line
  border-top: 1px solid #444444
  margin: 10px 0px
</style>
