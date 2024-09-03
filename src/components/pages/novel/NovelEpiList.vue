<template>
    <section class="episode-list-section base-wrapper base-distance">
        <div class="list-info">
            <span>화수: {{ episodesInfo.data.chapterCount }}화</span>
            <span>최신 업데이트 날짜: {{ episodesInfo.data.lastUpdatedAt }}</span>
        </div>
        <InfiniteScroll class="list-view" v-bind="scrollProps">
            <template v-slot:default="{ item }">
                <EpiListElement :episode="item"></EpiListElement>
            </template>
        </InfiniteScroll>
    </section>
</template>

<script setup>
import EpiListElement from "./EpiListElement.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";

import { ref, onMounted, inject, reactive, computed } from "vue";
import { episodeApi } from "@/hooks/backendApi";
import { formatUtil } from "@/hooks/format";

//novel id 값
const novelId = inject("novelId");

//스크롤 페이지 로드 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 30 },
    loadMethod: async (page, size) => {
        const loaditems = await episodeApi.getEpisodesByNovel(novelId, "initial", page, size);
        return loaditems;
    },
    loadingMessage: "Episode Loading...",
});

//작품 에피소드의 메타 데이터 로드
const episodesInfo = reactive({
    data: {
        chapterCount: 0,
        lastUpdatedAt: "",
    },
    async load() {
        const resp = await episodeApi.getEpisodesInfoByNovel(novelId);
        // console.log(resp);
        this.data.chapterCount = resp.chapterCount;
        this.data.lastUpdatedAt = formatUtil.formatDate(resp.lastUpdatedAt);
    },
});

onMounted(() => {
    episodesInfo.load();
});
</script>

<style lang="sass" scoped>
@use '@/assets/base.sass'

.episode-list-section

    .list-info
        padding: 10px
        border-bottom: 2px solid #e0e0e0
        display: flex
        flex-direction: row
        justify-content: space-between

    .list-view
        display: flex
        flex-direction: column
        margin-bottom: 10px
</style>
