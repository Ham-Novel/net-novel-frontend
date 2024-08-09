<template>
    <NovelItem
        :width="props.size.width"
        :height="props.size.height"
        :img-url="props.brief.coverImg"
        :novel-id="props.brief.id"
        :title="props.brief.title"
    >
        <slot></slot>
        <slot name="feature"></slot>
    </NovelItem>
</template>

<script setup>
import NovelItem from "./NovelItem.vue";

const props = defineProps({
    size: {
        type: Object,
        default: {
            width: "100%",
            height: "180px",
        },
    },
    brief: {
        type: Object,
        default: {
            id: undefined,
            title: "NovelListItem",
            coverImg: undefined,
        },
    },
});
</script>

<style scoped lang="sass">
.novel-item
    flex-flow: row nowrap
    gap: 25px

    :deep(.novel-cover)
        width: 140px
</style>
