<template>
    <main>
        <div>
            <NovelInfo class="novel-info" :novel-id="props.novelId"></NovelInfo>
        </div>
        <TabRouter :tabs="tabs" class="base-wrapper"> </TabRouter>
        <router-view :novel-id="props.novelId"></router-view>
    </main>
</template>

<script setup>
import NovelInfo from "./NovelInfo.vue";
import TabRouter from "@/components/reusable/TabRouter.vue";

import { provide, ref } from "vue";

// '/novels/1' 같이 url 데이터 처리
const props = defineProps({
    novelId: {
        type: Number,
        default: 0,
    },
});

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
