<template>
    <main>
        <EpisodeList :novelId="novelId" :episodeId="episodeId"></EpisodeList>
    </main>
</template>

<script setup>
import EpisodeList from "./pages/episode/EpisodeList.vue";

const novelId = 1;
const episodeId = 1;
</script>
