<template>
    <main>
        <NovelInfo class="novel-info" :novel-id="props.novelId"></NovelInfo>
        <section>
            <TabRouter :tabs="tabs" class="base-wrapper"> </TabRouter>
            <TabView class="base-wrapper" :novel-id="props.novelId"></TabView>
        </section>
    </main>
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
