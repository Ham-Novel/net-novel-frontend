<template>
    <main>
        <EpisodeContent></EpisodeContent>
        <PayCheckDialog></PayCheckDialog>
    </main>
</template>

<script setup>
import EpisodeContent from "./EpisodeContent.vue";
import PayCheckDialog from "./PayCheckDialog.vue";

import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { episodeApi } from "@/backendApi";

//에피소드 페이지에서는 네비게이션 비활성화
const store = useStore();
onMounted(() => {
    store.commit("navi/off");
});

//에피소드 로딩
const route = useRoute();
const episodeId = route.params.id;

const episode = ref("");
function loadEpisode() {
    episodeApi.getEpisode(episodeId).then((data) => {
        console.log(data);
        episode.value = data.content;
    });
}

onMounted(() => {
    loadEpisode();
});
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"

.episode-nav
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    z-index: 1000
    background-color: white
    border-top: 3px solid black
</style>
