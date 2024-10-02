<template>
    <div class="search-novel-list">
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
                ></ListItem>
            </template>
        </InfiniteScroll>
    </div>
</template>

<script setup>
import ListItem from "@/components/reusable/novel/ListItem.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";
import { Eye, Heart, Clock8 } from "lucide-vue-next";

import { novelApi } from "@/hooks/backendApi";
import { useSearchStore } from "@/stores/searchStore";
import { computed, reactive, ref, markRaw } from "vue";
import { formatUtil } from "@/hooks/format";

const searchStore = useSearchStore();
const didSearch = ref(false);

//스크롤 페이지 로드 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 5 },
    loadMethod: async (page, size) => {
        const loadNovels = await novelApi.searchNovel(
            searchStore.getWord,
            searchStore.getType,
            page,
            size
        );
        return loadNovels;
    },
    mountLoad: false,
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
.search-novel-list
    padding-top: 30px
    display: flex
    justify-content: flex-start
    flex-flow: row wrap
    gap: 15px
</style>
