<template>
    <div class="ranking-item">
        <h1 class="rank">{{ props.index }}</h1>
        <CardItem class="item" v-bind="itemProps"></CardItem>
    </div>
</template>

<script setup>
import CardItem from "@/components/reusable/novel/CardItem.vue";

const props = defineProps({
    novel: {
        type: Object,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
});

const itemProps = {
    brief: {
        title: props.novel.title,
        coverImg: props.novel.thumbnailUrl,
    },
    link: { name: "novel", params: { id: props.novel.id } },
};
</script>

<style scoped lang="sass">

.ranking-item
    position: relative

.rank
    position: absolute
    top: -3%
    left: -3%
    z-index: 1

    display: inline-block
    width: 30px
    height: 30px
    margin-bottom: 5px
    border-radius: 15px

    background-color: #6159f7
    color: white
    font-size: 20px
    text-align: center

.item
    width: 180px
</style>
