<template>
    <section>
        <h6>에피소드 관리</h6>
        <div class="menu-list">
            <button class="outline" @click="goToEpisodeEditPage">에피소드 관리</button>
        </div>
    </section>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

const novel = inject("novel");

const router = useRouter();
function goToEpisodeEditPage() {
    router.push({ name: "episode-edit", params: { id: novel.id } });
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
