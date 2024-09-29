<template>
    <CardItem class="item" v-bind="itemProps">
        <template #cover>
            <h1 class="rank">{{ index }}</h1>
        </template>
        <template #default>
            <div class="tag-list" v-if="novel.tags.length !== 0">
                <template v-for="tag in novel.tags" :key="tag.id">
                    <Tag class="tag" :tag="tag"></Tag>
                </template>
            </div>
        </template>
    </CardItem>
</template>

<script setup>
import CardItem from "@/components/reusable/novel/CardItem.vue";
import Tag from "@/components/reusable/Tag.vue";

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

.rank
    position: absolute
    top: 0
    left: 0
    z-index: 1

    padding: 0.15rem 0.5rem
    border-bottom-right-radius: 5px

    background-color: var(--pico-primary)
    color: white
    font-size: 20px
    text-align: center

    display: flex
    justify-content: center
    align-items: center

.tag-list
    margin-top: 0.3rem
    height: 2.5rem

    display: flex
    flex-flow: row wrap
    align-items: baseline
    overflow: hidden

    .tag
        font-size: 0.6rem

.item
    width: 150px
    gap: 10px
</style>
