<template>
    <main>
        <div>
            <NovelInfo class="novel-info" :novel-id="id"></NovelInfo>
        </div>
        <TabList :tabs="tabs" v-model="currentTab"></TabList>
        <component :is="currentTab" :novel-id="id"></component>
    </main>
</template>

<script setup>
import NovelInfo from "./NovelInfo.vue";
import NovelEpiList from "./NovelEpiList.vue";
import NovelCommentList from "./NovelCommentList.vue";
import TabList from "@/components/reusable/TabList.vue";

import { ref, markRaw, onMounted } from "vue";
import { useRoute } from "vue-router";

// tab 요소들
const EpiList = markRaw(NovelEpiList);
const CommentList = markRaw(NovelCommentList);
const tabs = [
    { name: "에피소드", component: EpiList },
    { name: "댓글", component: CommentList },
];

//현재 선택한 tab
const currentTab = ref(EpiList);

// '/novels/1' 같이 url 데이터 처리
const route = useRoute();
const id = route.params.id;
</script>
