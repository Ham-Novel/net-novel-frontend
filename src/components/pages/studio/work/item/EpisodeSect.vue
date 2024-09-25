<template>
    <div>
        <button class="episode-create-button" @click="goToEpisodeCreatePage(novel.id)">
            새 에피소드
        </button>
    </div>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

const novel = inject("novel");

const router = useRouter();
function goToEpisodeCreatePage(novelId) {
    router.push({ name: "episode-create", params: { id: novelId } });
}
</script>

<style scoped lang="sass">

button
    width: fit-content
    padding: 5px 10px
    background-color: var(--bg-main)
    color: var(--text-basic)
    font-weight: 700
    border: 2px solid var(--text-basic)
    border-radius: 5px
    cursor: pointer
</style>
