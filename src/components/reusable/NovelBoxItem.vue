<template>
    <article class="novel-box-item">
        <img class="novel-cover" src="" />
        <div class="novel-info">
            <slot></slot>
        </div>
    </article>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const props = defineProps({
    itemSize: {
        type: Object,
        default: {
            width: 160,
            height: 260,
            unit: "px",
        },
    },
});

const styleWidth = computed(() => {
    return `${props.itemSize?.width ?? 160}${props.itemSize?.unit ?? "px"}`;
});

const styleHeight = computed(() => {
    return `${props.itemSize?.height ?? 260}${props.itemSize?.unit ?? "px"}`;
});
</script>

<style scoped lang="sass">
.novel-box-item
    width: v-bind(styleWidth)
    height: v-bind(styleHeight)
    display: flex
    flex-direction: column
    align-items: stretch
    gap: 10px

.novel-cover
    flex: 6
    border-radius: 5px
    background-color: gray

.novel-info
    flex: 2
    display: flex
    flex-direction: column
    justify-content: flex-start
    gap: 5px
</style>
