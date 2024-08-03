<template>
    <main>
        <div class="novel-info-background">
            <NovelInfo
                class="novel-info base-wrapper base-distance"
                :novel-id="id"
            ></NovelInfo>
        </div>
        <TabList
            class="base-wrapper base-distance"
            :tabs="tabs"
            v-slot:default="slotProps"
        >
            <component :is="slotProps.activeTab" :novel-id="id"></component>
        </TabList>
    </main>
</template>

<script setup>
import NovelInfo from "./NovelInfo.vue";
import NovelEpiList from "./NovelEpiList.vue";
import NovelCommentList from "./NovelCommentList.vue";
import InfiniteScroll from "../../reusable/InfiniteScroll.vue";
import TabList from "./TabList.vue";

import { ref, markRaw } from "vue";
import { useRoute } from "vue-router";

// tab 요소들 TabList에 전달
const EpiList = markRaw(NovelEpiList);
const CommentList = markRaw(NovelCommentList);
const Scroll = markRaw(InfiniteScroll);
const tabs = [
    { name: "에피소드", component: EpiList },
    { name: "댓글", component: CommentList },
    { name: "스크롤", component: Scroll },
];

// '/novel?id=1' 같은 query string 처리
const route = useRoute();
const id = ref(route.query.id);
</script>

<style lang="sass" scoped>
@use "@/assets/base.sass"

.novel-info-background
    background-color: #f5f6fc
    padding-top: 30px
</style>
