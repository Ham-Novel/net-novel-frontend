<template>
    <CardItem class="item" v-bind="itemProps">
        <template #cover>
            <div class="rank">{{ rank }}</div>
        </template>
        <p class="author">{{ props.novel.authorName }}</p>
        <!-- <p class="description">
            {{ props.novel.desc }}
        </p> -->
    </CardItem>
</template>

<script setup>
import CardItem from "@/components/reusable/novel/CardItem.vue";

const props = defineProps({
    novel: {
        type: Object,
        required: true,
    },
    rank: {
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

.item
    gap: 5px

    :deep(.info)
        .title
            font-size: 20px
            overflow: hidden

.author
    font-size: 14px
    font-weight: 700
    color: gray

.rank
    position: absolute
    top: 0px
    left: 0px

    display: inline-block
    padding: 2% 6%
    border-bottom-right-radius: 10px

    font-size: 12px
    color: white
    background-color: var(--primary-color)
</style>
