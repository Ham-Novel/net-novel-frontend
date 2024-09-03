<template>
    <ListItem v-bind="itemProps">
        <div>
            <p>화수: {{ props.novel.episodeCount }}</p>
            <p>조회수: {{ props.novel.views }}</p>
            <p>선호작: {{ props.novel.favoriteCount }}</p>
            <p>별점: {{ props.novel.averageRating }}</p>
        </div>
        <button class="episode-create-button" @click="emits('createEpisodeEvent', props.novel.id)">
            새 에피소드
        </button>
    </ListItem>
</template>

<script setup>
import ListItem from "@/components/reusable/novel/ListItem.vue";

const props = defineProps({
    novel: {
        type: Object,
        required: true,
    },
});

const emits = defineEmits(["createEpisodeEvent"]);

const itemProps = {
    brief: {
        title: props.novel.title,
        coverImg: props.novel.thumbnailUrl,
    },
    link: { name: "novel", params: { id: props.novel.id } },
};
</script>

<style scoped lang="sass"></style>
