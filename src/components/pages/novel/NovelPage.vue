<template>
    <main>
        <div>
            <NovelInfo class="novel-info" :novel-id="id"></NovelInfo>
        </div>
        <TabList :tabs="tabs" v-slot:default="slotProps">
            <component :is="slotProps.activeTab" :novel-id="id"></component>
        </TabList>
    </main>
</template>

<script setup>
import NovelInfo from "./NovelInfo.vue";
import NovelEpiList from "./NovelEpiList.vue";
import NovelCommentList from "./NovelCommentList.vue";
import TabList from "@/components/reusable/TabList.vue";

import { ref, markRaw, onMounted } from "vue";
import { useRoute } from "vue-router";

// tab 요소들 TabList에 전달
const EpiList = markRaw(NovelEpiList);
const CommentList = markRaw(NovelCommentList);
const tabs = [
    { name: "에피소드", component: EpiList },
    { name: "댓글", component: CommentList },
];

// '/novel?id=1' 같은 query string 처리
const route = useRoute();
const id = ref(route.query.id);
</script>
