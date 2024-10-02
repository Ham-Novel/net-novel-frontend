<template>
    <main>
        <section class="browse-feature">
            <div class="feature-divider base-wrapper">
                <BrowseFilter
                    class="filter-by"
                    v-model="tags"
                    @filter="reloadBrowseList"
                ></BrowseFilter>
                <BrowseSort class="sort-by" v-model="sort" @sort="reloadBrowseList"></BrowseSort>
            </div>
        </section>
        <section class="browse-result">
            <div class="browse-novel-list base-wrapper base-distance">
                <InfiniteScroll v-bind="scrollProps" ref="scrollRef">
                    <template #default="{ item }">
                        <ListItem
                            :id="item.id"
                            :title="item.title"
                            :author="item.authorName"
                            :cover-img="item.thumbnailUrl"
                            :stats="[
                                { icon: markRaw(Eye), value: item.totalView },
                                { icon: markRaw(Heart), value: item.totalFavorites },
                                {
                                    icon: markRaw(Clock8),
                                    value: formatUtil.formatRealTime(item.latestUpdateAt),
                                },
                            ]"
                            :tags="item.tags"
                            :description="item.description"
                        ></ListItem>
                    </template>
                </InfiniteScroll>
            </div>
        </section>
    </main>
</template>

<script setup>
import ListItem from "@/components/reusable/novel/ListItem.vue";
import BrowseFilter from "./BrowseFilter.vue";
import BrowseSort from "./BrowseSort.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";
import { Eye, Heart, Clock8 } from "lucide-vue-next";

import { formatUtil } from "@/hooks/format";
import { novelApi } from "@/hooks/backendApi";
import { computed, markRaw, onMounted, reactive, ref, toRaw, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

//query string으로 받은 tag 데이터
const queryTags = computed(() => {
    if (route.query.tags === null || route.query.tags === undefined) {
        return [];
    }
    if (Array.isArray(route.query.tags)) {
        return route.query.tags.map(Number);
    }
    return [Number(route.query.tags)];
});

watch(queryTags, (newValue) => {
    tags.value = newValue;
    scrollRef.value.reset();
});

const tags = ref(queryTags.value);
const sort = ref("latest");

//스크롤 페이지 로드 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 5 },
    loadMethod: async (page, size) => {
        const loadData = await novelApi.browseNovel(sort.value, page, size, toRaw(tags.value));
        console.log(...loadData);
        return loadData;
    },
});

const scrollRef = ref(null);
const reloadBrowseList = () => {
    console.debug("[BROWSE] reload: ", tags.value);
    scrollRef.value.reset();
};
</script>

<style lang="sass" scoped>

.browse-feature
    position: relative

.feature-divider
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
    gap: 10px
</style>
