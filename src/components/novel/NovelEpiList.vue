<template>
    <div class="episode-list">
        <div class="novel-engagement"></div>
        <p v-if="episodes.length == 0">Episode Loading</p>
        <EpiListElement v-else v-for="episode in episodes" :episode="episode">
        </EpiListElement>
    </div>
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
        // console.log(resp);
        episodes.push(...resp);
    } catch (error) {
        console.error("Error fetching episodes:", error);
    }
}

onMounted(() => {
    loadEpisodes().then(() => {
        // console.log(episodes);
    });
});
</script>

<style scoped>
.episode-list {
    font-family: Arial, sans-serif;
    border-top: 2px solid #e0e0e0;
}

.novel-engagement {
    display: flex;
    justify-content: space-between;
}
</style>
