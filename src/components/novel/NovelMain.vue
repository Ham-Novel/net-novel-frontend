<template>
    <main>
        <NovelInfo :novel-id="id"></NovelInfo>
        <section>
            <ul id="tab-list">
                <li @click="activeTab = EpiList">에피소드</li>
                <li @click="activeTab = CommentList">댓글</li>
            </ul>
            <component :is="activeTab" :novel-id="id"></component>
        </section>
    </main>
</template>

<script setup>
import NovelInfo from "./NovelInfo.vue";
import NovelEpiList from "./NovelEpiList.vue";
import NovelCommentList from "./NovelCommentList.vue";

import { ref, onMounted, markRaw } from "vue";
import { useRoute } from "vue-router";

const EpiList = markRaw(NovelEpiList);
const CommentList = markRaw(NovelCommentList);
const activeTab = ref(EpiList);

const route = useRoute();
const id = ref(route.query.id);
</script>

<style scoped>
#tab-list {
    display: flex;
    list-style-type: none;
    margin-left: 20px;
    margin-bottom: 10px;
}

#tab-list li {
    padding: 5px 30px;
    cursor: pointer;
    border-right: 2px solid #ccc;
    font-size: 20px;
}

#tab-list li.active {
    border-bottom: 3px solid blue;
}
</style>
