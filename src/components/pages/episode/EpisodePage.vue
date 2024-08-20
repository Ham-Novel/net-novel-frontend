<template>
    <main>
        <component :is="currentTab" novel-id="1"></component>
        <TabList
            class="episode-nav"
            :tabs="tabs"
            v-model="currentTab"
        ></TabList>
    </main>
</template>

<script setup>
import EpisodeNav from "./EpisodeNav.vue";
import EpisodeContent from "./EpisodeContent.vue";
import TabList from "@/components/reusable/TabList.vue";

import { markRaw, onMounted, ref } from "vue";
import { useStore } from "vuex";
import NovelCommentList from "../novel/NovelCommentList.vue";

const store = useStore();

//에피소드 페이지에서는 네비게이션 비활성화
onMounted(() => {
    store.commit("navi/off");
});

const EpiContent = markRaw(EpisodeContent);
const CommentList = markRaw(NovelCommentList);
const tabs = [
    { name: "콘텐츠", component: EpiContent },
    { name: "댓글", component: CommentList },
];
const currentTab = ref(EpiContent);
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
