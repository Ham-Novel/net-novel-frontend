<template>
    <section class="episode-list-section base-wrapper base-distance">
        <div class="list-info">
            <span>화수: {{ episodesInfo.chapterCount }}화</span>
            <span
                >최신 업데이트 날짜:
                {{ util.formatDate(episodesInfo.lastUpdatedAt) }}</span
            >
        </div>
        <InfiniteScroll
            class="list-view"
            :load-method="loadEpisodes"
            @add-items="addEpisodes"
            loading-message="Episode Loading..."
        >
            <template v-for="episode in episodes">
                <EpiListElement :episode="episode"></EpiListElement>
            </template>
        </InfiniteScroll>
    </section>
</template>

<script setup>
import EpiListElement from "./EpiListElement.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";

import { ref, reactive, onMounted } from "vue";
import { episodeApi } from "@/backendApi";
import { util } from "@/format";

//작품 id 외부 컴포넌트에서 받기
const props = defineProps(["novelId"]);

//무한스크롤 관련 변수
const pageNumber = ref(0);
const pageSize = ref(30);
const episodes = reactive([]); //데이터 저장 공간

//데이터 저장 메서드
const addEpisodes = (newItems) => {
    episodes.push(...newItems);
};

//데이터 로드 메서드
const loadEpisodes = async () => {
    const loaditems = await episodeApi.getEpisodesByNovel(
        props.novelId,
        "initial",
        pageNumber.value,
        pageSize.value
    );
    pageNumber.value++;
    return loaditems;
};

//데이터 리셋
const resetEpisodes = () => {
    pageNumber.value = 0;
    episodes.splice(0, episodes.length);
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
