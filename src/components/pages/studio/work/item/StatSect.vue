<template>
    <div class="stat">
        <span> <ScrollText size="20" /> {{ novel.episodeCount }} </span>
        <span> <Eye size="20" /> {{ novel.views }} </span>
        <span>
            <Heart size="20" />
            {{ novel.favoriteCount }}
        </span>
        <span>
            <Star size="20" />
            {{ novel.averageRating }}
        </span>
    </div>
</template>

<script setup>
import { Eye, Heart, Star, ScrollText } from "lucide-vue-next";
import { inject } from "vue";

const novel = inject("novel");
</script>

<style scoped lang="sass">
span
    font-size: 15px

    flex-shrink: 0
    display: flex
    align-items: center
    gap: 5px

.stat
    height: 100%

    display: flex
    flex-flow: column wrap
    justify-content: center
    gap: 10px
</style>
