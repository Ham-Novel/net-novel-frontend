<template>
    <section>
        <h6>에피소드 관리</h6>
        <div class="menu-list">
            <button class="outline" @click="goToEpisodeCreatePage">에피소드 추가</button>
            <button class="outline" @click="goToEpisodeCreatePage">에피소드 수정</button>
            <button class="outline" @click="goToEpisodeCreatePage">에피소드 삭제</button>
        </div>
    </section>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

const novel = inject("novel");

const router = useRouter();
function goToEpisodeCreatePage() {
    router.push({ name: "episode-create", params: { id: novel.id } });
}
</script>

<style scoped lang="sass">

h6
    margin-bottom: 15px

.menu-list
    display: flex
    flex-flow: column wrap
    align-content: flex-start
    gap: 10px
</style>
