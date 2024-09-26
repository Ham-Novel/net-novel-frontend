<template>
    <div class="novel-sect">
        <button @click="goToUpdateNovelPage">작품 수정</button>
        <button @click="goToDeleteNovelPage">작품 삭제</button>
    </div>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

//WorkListItem의 novel 정보
const novel = inject("novel");

const router = useRouter();

function goToUpdateNovelPage() {
    router.push({ name: "novel-update", params: { id: novel.id } });
}
function goToDeleteNovelPage() {
    router.push({ name: "novel-delete", params: { id: novel.id } });
}
</script>

<style scoped lang="sass">
.novel-sect
    height: 100%
    display: flex
    flex-flow: column wrap
    align-content: flex-start
    gap: 10px


    button
        padding: 5px 10px
        background-color: var(--bg-main)
        color: var(--text-basic)
        font-weight: 700
        border: 2px solid var(--text-basic)
        border-radius: 5px
        cursor: pointer
</style>
