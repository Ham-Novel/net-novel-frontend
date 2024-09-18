<template>
    <span
        @click="browseTag(tag.id)"
        :class="{ 'block-style': blockStyle, 'text-style': !blockStyle }"
    >
        {{ tagName }}
    </span>
</template>

<script setup>
import { computed, toRefs } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    tag: Object,
    blockStyle: {
        type: Boolean,
        default: false,
    },
});
const { tag } = toRefs(props);

const tagName = computed(() => {
    if (props.blockStyle) {
        return tag.value.name;
    } else {
        return "#" + tag.value.name;
    }
});

const router = useRouter();
const browseTag = (tagId) => {
    router.push({ name: "browse", query: { tags: tagId } });
};
</script>

<style scoped lang="sass">
span
    font-weight: 700
    flex-shrink: 0

.block-style
    padding: 0.3em 0.6em
    border-radius: 5px
    background-color: var(--primary-color)
    color: var(--text-reverse)
    cursor: pointer

.text-style
    color: var(--primary-color)
    cursor: pointer

    &:hover
        text-decoration: underline
</style>
