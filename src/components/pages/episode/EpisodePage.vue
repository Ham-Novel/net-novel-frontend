<template>
    <div class="episode-page">
        <EpisodeList :novelId="props.novelId" :episodeId="props.episodeId"></EpisodeList>
    </div>
</template>

<script setup>
// import PayCheckDialog from "./PayCheckDialog.vue";
import EpisodeList from "./EpisodeList.vue";

import { onMounted, ref } from "vue";
import { useStore } from "vuex";

//에피소드 페이지에서는 네비게이션 비활성화
const store = useStore();
onMounted(() => {
    store.commit("navi/off");
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
@use "@/assets/base.sass"

.episode-page
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
