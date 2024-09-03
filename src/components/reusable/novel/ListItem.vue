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
    width: auto
    height: 200px
    gap: 20px
</style>
