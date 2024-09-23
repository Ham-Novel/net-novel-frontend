<template>
    <section class="episode-list-section base-wrapper base-distance">
        <div class="list-info">
            <span>화수: {{ episodesInfo.data.chapterCount }}화</span>
            <span>최신 업데이트 날짜: {{ episodesInfo.data.lastUpdatedAt }}</span>
        </div>
        <div class="list-view">
            <InfiniteScroll v-bind="scrollProps">
                <template v-slot:default="{ item }">
                    <EpiListElement :episode="item"></EpiListElement>
                </template>
            </InfiniteScroll>
        </div>
    </section>
</template>

<script setup>
import EpiListElement from "./EpisodeListItem.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";

import { onMounted, reactive } from "vue";
import { episodeApi } from "@/hooks/backendApi";
import { formatUtil } from "@/hooks/format";

//novel id 값
const props = defineProps({
    novelId: {
        type: Number,
        required: true,
    },
});

//스크롤 페이지 로드 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 30 },
    loadMethod: async (page, size) => {
        const loaditems = await episodeApi.getEpisodesByNovel(props.novelId, "initial", page, size);
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
        const resp = await episodeApi.getEpisodesInfoByNovel(props.novelId);
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

.episode-list-section

    .list-info
        padding: 10px
        border-bottom: 2px solid var(--bg-dark)
        display: flex
        flex-direction: row
        justify-content: space-between

    .list-view
        display: flex
        flex-direction: column
        margin-bottom: 10px
</style>
