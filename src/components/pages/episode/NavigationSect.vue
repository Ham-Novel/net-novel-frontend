<template>
    <aside>
        <nav>
            <ul>
                <li @click="toggleModal(EpisodeListModal)"><List size="30" /></li>
                <li @click="toggleModal(CommentListModal)"><MessageSquareMore size="30" /></li>
                <li><Info size="30" /></li>
            </ul>
        </nav>
    </aside>
</template>

<script setup>
import CommentListModal from "./modal/CommentListModal.vue";
import EpisodeListModal from "./modal/EpisodeListModal.vue";

import { List, MessageSquareMore, Info } from "lucide-vue-next";
import { useEpisodePageStore } from "./episodePageStore";
import { markRaw, watch } from "vue";

//에피소드 페이지 전역 변수
const episodeStore = useEpisodePageStore();

watch(
    () => episodeStore.currentMenu,
    (value) => {
        // event.target.classList.add("checked");
    }
);

function toggleModal(modal) {
    if (episodeStore.currentMenu === modal) {
        episodeStore.currentMenu = null;
        return;
    }
    episodeStore.currentMenu = markRaw(modal);
}
</script>

<style scoped lang="sass">
aside
    position: fixed
    top: 0
    right: 0
    -webkit-transform: translateZ(0)
    z-index: 1000

    width: 80px
    height: 100%

    background-color: var(--pico-background-color)
    border-left: 1px solid var(--pico-muted-border-color)
    box-shadow: var(--pico-box-shadow)

    nav
        height: 100%

ul
    height: 100%
    display: flex
    flex-flow: column wrap
    justify-content: center
    gap: 10%

    li
        cursor: pointer

        &:hover
            color: var(--pico-secondary)

.checked
    color: var(--pico-primary)
</style>
