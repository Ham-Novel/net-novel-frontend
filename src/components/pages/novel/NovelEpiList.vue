<template>
    <section class="episode-list-section base-wrapper base-distance">
        <div class="list-info">
            <span>화수: {{ episodes.length }}화</span>
            <span>최신 업데이트 날짜: 24/07/24</span>
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

const props = defineProps(["novelId"]);

const pageNumber = ref(0);
const pageSize = ref(30);
const episodes = reactive([]);

const resetEpisodes = () => {
    pageNumber.value = 0;
    episodes.splice(0, episodes.length);
};

const addEpisodes = async (newItems) => {
    episodes.push(...newItems);
};

const loadEpisodes = async () => {
    const loaditems = await episodeApi
        .getEpisodesByNovel(
            props.novelId,
            "initial",
            pageNumber.value,
            pageSize.value
        )
        .then();
    pageNumber.value++;
    return loaditems;
};
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
