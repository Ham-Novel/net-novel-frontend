<template>
    <article class="item">
        <div class="cover" @click="goLinkPage">
            <CoverImg class="img" :img-url="coverImg"></CoverImg>
            <slot name="cover"></slot>
        </div>
        <div class="info">
            <h5 class="title" @click="goLinkPage">{{ title }}</h5>
            <p class="author" v-if="author"><PencilLine size="13" />{{ author }}</p>
            <div class="tag-list" v-if="tags.length !== 0">
                <template v-for="tag in tags" :key="tag.id">
                    <Tag class="tag" :tag="tag"></Tag>
                </template>
            </div>
            <div class="detail">
                <slot></slot>
            </div>
        </div>
    </article>
</template>

<script setup>
import CoverImg from "../CoverImg.vue";
import Tag from "../Tag.vue";

import { PencilLine } from "lucide-vue-next";
import { useRouter } from "vue-router";

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        default: "",
    },
    author: {
        type: String,
        default: "",
    },
    coverImg: {
        type: String,
        default: "",
    },
    tags: {
        type: Array,
        default: [],
    },
});

//클릭하면 해당 id 값의 Page로 이동
const router = useRouter();
function goLinkPage() {
    router.push({ name: "novel", params: { id: props.id } });
}
</script>

<style scoped lang="sass">
article
    padding: 0

.item
    width: 150px
    height: auto
    position: relative
    display: flex
    flex-flow: column nowrap
    align-items: stretch

.cover
    position: relative
    aspect-ratio: 4 / 5
    overflow: hidden
    border-radius: 5px
    flex: 0 0 auto

    .img
        width: 100%
        height: 100%

.info
    flex: 1
    position: relative
    padding: 4%
    overflow: hidden
    white-space: nowrap

    display: flex
    flex-flow: column nowrap
    gap: 2px

    .title
        display: inline-block
        font-size: 1.0em
        font-weight: bold
        cursor: pointer
        overflow: hidden
        text-overflow: ellipsis

        &:hover
            text-decoration: underline

    .author
        font-size: 0.6rem
        font-weight: 700
        overflow: hidden
        text-overflow: ellipsis

        display: inline-flex
        align-items: center
        gap: 2px

    .tag-list
        height: 2.4rem

        display: flex
        flex-flow: row wrap
        align-items: baseline
        overflow: hidden

        .tag
            font-size: 0.6rem
</style>
