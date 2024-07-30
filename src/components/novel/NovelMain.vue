<template>
    <NovelInfo :novel-id="id"></NovelInfo>
    <section>
        <ul class="tab-list">
            <li @click="activeTab = EpiList">에피소드</li>
            <li @click="activeTab = CommentList">댓글</li>
        </ul>
        <component :is="activeTab" :novel-id="id"></component>
    </section>
</template>

<script setup>
import NovelInfo from "./NovelInfo.vue";
import NovelEpiList from "./NovelEpiList.vue";
import NovelCommentList from "./NovelCommentList.vue";
import { ref, onMounted, markRaw } from "vue";
import novelAPI from "@/serverApi";

const EpiList = markRaw(NovelEpiList);
const CommentList = markRaw(NovelCommentList);

const activeTab = ref(EpiList);

const id = ref(2);
</script>

<style scoped>
.tab-list {
    display: flex;
    list-style-type: none;
    margin-left: 20px;
    margin-bottom: 10px;
}

.tab-list li {
    padding: 5px 30px;
    cursor: pointer;
    border-right: 2px solid #ccc;
    font-size: 20px;
}

.tab-list li.active {
    border-bottom: 1px solid blue;
}

.tab-content {
    padding: 20px;
    border: 1px solid #ccc;
    border-top: none;
}
</style>
