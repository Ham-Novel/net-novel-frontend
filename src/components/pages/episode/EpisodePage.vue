<template>
    <main class="episode-page">
        <EpisodeSect :novelId="props.novelId" :episodeId="props.episodeId"></EpisodeSect>
        <NavigationSect></NavigationSect>
        <component :is="episodeStore.currentMenu"></component>
    </main>
</template>

<script setup>
import EpisodeSect from "./EpisodeSect.vue";
import NavigationSect from "./NavigationSect.vue";

import { onMounted, onUnmounted, ref } from "vue";
import { useNavBarStore } from "@/stores/navBarStore";
import { useEpisodePageStore } from "./episodePageStore";

//에피소드 페이지 전역 변수
const episodeStore = useEpisodePageStore();

//네비게이션 활성화 관리
const navBarStore = useNavBarStore();

//url에서 에피소드 id 데이터 가져오기
const props = defineProps({
    novelId: {
        type: Number,
        default: 0,
    },
    episodeId: {
        type: Number,
        default: 0,
    },
});

episodeStore.episodeId = props.episodeId;

//에피소드 페이지에서는 네비게이션 비활성화
onMounted(() => {
    navBarStore.off();
});

onUnmounted(() => {
    navBarStore.on();
});
</script>

<style scoped lang="sass">
main
    position: relative
    display: flex
    flex-flow: row wrap
    align-items: stretch
</style>
