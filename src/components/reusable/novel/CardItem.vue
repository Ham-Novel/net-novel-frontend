<template>
    <BaseItem
        v-bind="{
            title: props.brief?.title,
            coverImg: props.brief?.coverImg,
            link: props.link,
        }"
    >
        <template #default>
            <slot></slot>
        </template>
    </BaseItem>
</template>

<script setup>
import BaseItem from "./BaseItem.vue";

const props = defineProps({
    brief: {
        type: Object,
        required: true,
    },
    link: {
        type: Object,
        required: true,
    },
});
</script>

<style scoped lang="sass">
.item
    width: 150px
    height: auto
    flex-flow: column nowrap
    gap: 0px

    :deep(.info)
        overflow: hidden
        white-space: nowrap
</style>
