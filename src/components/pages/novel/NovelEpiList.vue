<template>
    <section class="episode-list-section base-wrapper base-distance">
        <div class="list-info">
            <span>화수: {{ episodesInfo.chapterCount }}화</span>
            <span
                >최신 업데이트 날짜:
                {{ formatUtil.formatDate(episodesInfo.lastUpdatedAt) }}</span
            >
        </div>
        <InfiniteScroll
            class="list-view"
            :load-method="loadEpisodes"
            :page-props="pageProps"
            loading-message="Episode Loading..."
        >
            <template v-slot:default="slotProps">
                <EpiListElement :episode="slotProps.item"></EpiListElement>
            </template>
        </InfiniteScroll>
    </section>
</template>

<script setup>
import EpiListElement from "./EpiListElement.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";

import { ref, onMounted } from "vue";
import { episodeApi } from "@/backendApi";
import { formatUtil } from "@/format";

//작품 id 외부 컴포넌트에서 받기
const props = defineProps(["novelId"]);

//스크롤 페이지 로드 설정 변수
const pageProps = ref({ number: 0, size: 30 });

//데이터 로드 메서드
const loadEpisodes = async (page, size) => {
    const loaditems = await episodeApi.getEpisodesByNovel(
        props.novelId,
        "initial",
        page,
        size
    );
    return loaditems;
};

//에피소드 리스트 메타 데이터 로드
const episodesInfo = ref({
    chapterCount: 0,
    lastUpdatedAt: "",
});

const loadEpisodesInfo = () => {
    episodeApi.getEpisodesInfoByNovel(props.novelId).then((info) => {
        console.log(info);
        episodesInfo.value = info;
    });
};

onMounted(() => {
    loadEpisodesInfo();
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
