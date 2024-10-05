<template>
    <dialog open class="list-view" @click="exitModal">
        <article class="hide-scrollbar" @click.stop>
            <EpisodeList :novel-id="episodeStore.novelId"></EpisodeList>
        </article>
    </dialog>
</template>

<script setup>
import EpisodeList from "@/components/reusable/episode/EpisodeList.vue";
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { episodeApi } from "@/hooks/backendApi";
import { useEpisodePageStore } from "../episodePageStore";

//에피소드 페이지 전역 변수
const episodeStore = useEpisodePageStore();

//modal 바깥을 클릭하면 끄기
function exitModal() {
    episodeStore.currentMenu = null;
}

onMounted(() => {
    document.body.style.overflow = "hidden";
});
onUnmounted(() => {
    document.body.style.overflow = "";
});

//스크롤 페이지 로드 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 20 },
    loadMethod: async (page, size) => {
        const loaditems = await episodeApi.getEpisodesByNovel(
            episodeStore.novelId,
            "initial",
            page,
            size
        );
        return loaditems;
    },
});
</script>

<style lang="sass" scoped>
dialog
    width: fit-content

article
    max-height: 90%
    min-height: 60%
    width: fit-content
    overflow-y: scroll
    overflow-x: none

    display: grid
    place-items: center

.hide-scrollbar::-webkit-scrollbar
    display: none

table
    width: 400px
    margin: 0
</style>
