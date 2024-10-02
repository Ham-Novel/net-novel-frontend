<template>
    <dialog open class="list-view" @click="exitModal">
        <article>
            <h1>에피소드 목록</h1>
        </article>
    </dialog>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { commentApi } from "@/hooks/backendApi";
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
</script>

<style lang="sass" scoped>
article
    max-height: 90%
    overflow-y: scroll
</style>
