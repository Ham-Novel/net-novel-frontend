<template>
    <NovelItem
        :width="props.size.width"
        :height="props.size.height"
        :img-url="props.brief.coverImg"
        :novel-id="props.brief.id"
        :title="props.brief.title"
    >
        <slot></slot>
    </NovelItem>
</template>

<script setup>
import { onMounted } from "vue";
import NovelItem from "./NovelItem.vue";

const props = defineProps({
    size: {
        type: Object,
        default: {
            width: "160px",
            height: "260px",
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

onMounted(() => {
    console.log(props.brief.id);
});
</script>

<style scoped lang="sass">

.novel-item
    flex-direction: column
    align-items: stretch
    gap: 10px

    :deep(.novel-cover)
        flex: 3

    :deep(.novel-info)
        display: flex
        flex-direction: column
        justify-content: flex-start
        gap: 5px

        .title
            align-self: flex-start //flex item을 inline으로 가능
</style>
