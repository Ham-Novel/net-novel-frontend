<template>
    <main class="episode-page">
        <EpisodeSect :novelId="props.novelId" :episodeId="props.episodeId"></EpisodeSect>
    </main>
</template>

<script setup>
import EpisodeSect from "./EpisodeSect.vue";

import { onMounted, onUnmounted, ref } from "vue";
import { useNavBarStore } from "@/stores/navBarStore";

//에피소드 페이지에서는 네비게이션 비활성화
const navBarStore = useNavBarStore();
onMounted(() => {
    navBarStore.off();
});

onUnmounted(() => {
    navBarStore.on();
});

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

//에피소드 api 통신
</script>

<style scoped lang="sass">


.episode-page
    // background-color: var(--line-color)
    background-color: #f3f2f1

.episode-nav
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    z-index: 1000
    background-color: white
    border-top: 3px solid black
</style>
