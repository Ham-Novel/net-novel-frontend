<template>
    <NovelInfo class="novel-info"></NovelInfo>
    <TabRouter :tabs="tabs" class="base-wrapper"> </TabRouter>
    <TabView></TabView>
</template>

<script setup>
import NovelInfo from "./NovelInfo.vue";
import TabRouter from "@/components/reusable/TabRouter.vue";
import TabView from "@/components/reusable/TabView.vue";

import { provide, ref } from "vue";

// url parameter 가져오기
const props = defineProps({
    novelId: {
        type: Number,
        default: 0,
    },
});

//NovelPage 내부 컴포넌트 전체에 novel id 값 전역 공유
provide("novelId", props.novelId);

// tab 요소들
const tabs = ref([
    {
        name: "에피소드",
        path: { name: "novel-episode" },
    },
    {
        name: "댓글",
        path: { name: "novel-comment" },
    },
]);
</script>

<style scoped lang="sass">
@use '@/assets/base.sass'
</style>
