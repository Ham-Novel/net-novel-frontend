<template>
    <BaseItem
        v-bind="{
            title: props.brief?.title,
            coverImg: props.brief?.coverImg,
            link: props.link,
        }"
    >
        <template #cover>
            <slot name="cover"></slot>
        </template>
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
    width: 100%
    height: 200px
    gap: 20px
</style>
