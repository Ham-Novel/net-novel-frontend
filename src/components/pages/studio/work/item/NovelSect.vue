<template>
    <section>
        <h6>작품 관리</h6>
        <div class="novel-sect">
            <button class="outline" @click="goToUpdateNovelPage">작품 수정</button>
            <button class="outline" @click="goToDeleteNovelPage">작품 삭제</button>
        </div>
    </section>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

//WorkListItem의 novel 정보
const novel = inject("novel");

const router = useRouter();

function goToUpdateNovelPage() {
    router.push({ name: "novel-update", params: { id: Number(novel.id) } });
}
function goToDeleteNovelPage() {
    router.push({ name: "novel-delete", params: { id: Number(novel.id) } });
}
</script>

<style scoped lang="sass">
h6
    margin-bottom: 15px

.novel-sect
    display: flex
    flex-flow: column wrap
    align-content: flex-start
    gap: 10px
</style>
