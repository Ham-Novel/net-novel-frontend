<template>
    <figure class="episode-list-figure base-wrapper base-distance">
        <div class="episode-list-info">
            <span>화수: {{ episodes.length }}화</span>
            <span>최신 업데이트 날짜: 24/07/24</span>
        </div>
        <div class="episode-list-loading" v-if="episodes.length == 0">
            <p>Episode Loading...</p>
        </div>
        <div class="episode-list" v-else>
            <EpiListElement
                v-for="episode in episodes"
                :episode="episode"
            ></EpiListElement>
        </div>
    </figure>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import novelAPI from "@/serverApi";
import EpiListElement from "./EpiListElement.vue";

const props = defineProps(["novelId"]);

const episodes = reactive([]);

async function loadEpisodes() {
    try {
        let resp = await novelAPI.getEpisodesByNovel(props.novelId);
        return Array.from(resp);
    } catch (error) {
        console.error("Error fetching episodes:", error);
    }
}

onMounted(() => {
    loadEpisodes().then((resp) => {
        console.log(resp);
        episodes.push(...resp);
    });
});
</script>

<style lang="sass" scoped>
@use '@/assets/base.sass'

.episode-list-info
    padding: 10px
    border-bottom: 2px solid #e0e0e0
    display: flex
    flex-direction: row
    justify-content: space-between

.episode-list-loading
    display: flex
    justify-content: center
    align-items: center
    height: 100px

.episode-list
    display: flex
    flex-direction: column
    margin-bottom: 10px
</style>
