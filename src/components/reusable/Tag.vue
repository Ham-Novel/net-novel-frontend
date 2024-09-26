<template>
    <button
        @click="browseTag(tag.id)"
        :class="{ outline: !blockStyle, 'block-style': blockStyle, 'text-style': !blockStyle }"
    >
        {{ tagName }}
    </button>
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
.block-style
    padding: 0.3em 0.6em
    cursor: pointer

.text-style
    padding: 0.2em 0.4em
    font-size: 14px
    border: none
    cursor: pointer

    &:hover
        text-decoration: underline
</style>
