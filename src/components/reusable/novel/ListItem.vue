<template>
    <article class="item">
        <div class="cover" @click="goLinkPage">
            <CoverImg class="img" :img-url="coverImg"></CoverImg>
            <slot name="cover"></slot>
        </div>
        <div class="info">
            <div class="header" v-if="!custom">
                <h4 class="title" v-if="title" @click="goLinkPage">{{ title }}</h4>
                <p class="author" v-if="author">
                    <PencilLine size="17" />
                    {{ author }}
                </p>
            </div>
            <div class="detail" v-if="!custom">
                <div class="stats">
                    <template v-for="stat in stats">
                        <span>
                            <component :is="stat.icon" size="16"></component>
                            {{ stat.value }}
                        </span>
                    </template>
                </div>
                <div class="tag-list">
                    <template v-for="tag in tags" :key="tag.id">
                        <Tag class="tag" :tag="tag"></Tag>
                    </template>
                </div>
                <blockquote class="desc" v-if="description">
                    {{ description }}
                </blockquote>
                <div class="desc" v-else></div>
            </div>
            <slot></slot>
        </div>
    </article>
</template>

<script setup>
import Tag from "../Tag.vue";
import CoverImg from "../CoverImg.vue";
import { PencilLine } from "lucide-vue-next";

import { useRouter } from "vue-router";
import { formatUtil } from "@/hooks/format";

const props = defineProps({
    custom: {
        type: Boolean,
        default: false,
    },
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        default: undefined,
    },
    author: {
        type: String,
        default: undefined,
    },
    coverImg: {
        type: String,
        default: undefined,
    },
    stats: {
        type: Array,
        default: [],
    },
    tags: {
        type: Array,
        default: [],
    },
    description: {
        type: String,
        default: undefined,
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
    width: 100%
    height: 200px
    position: relative
    display: flex
    flex-flow: row nowrap
    align-items: stretch

.cover
    position: relative
    aspect-ratio: 4 / 5
    flex: 0 0 auto

    .img
        width: 100%
        height: 100%

.info
    flex: 1
    position: relative
    padding: 2%


    display: flex
    flex-flow: column nowrap
    gap: 10px

    .header
        display: flex
        flex-flow: row wrap
        align-items: flex-end
        gap: 10px

        .title
            max-width: 50%
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            cursor: pointer

            &:hover
                text-decoration: underline

        .author
            font-size: 0.7rem
            font-weight: 700
            display: inline-flex
            align-items: center
            gap: 2px

.detail
    flex: 1
    font-size: 0.7rem
    display: flex
    flex-flow: column wrap
    gap: 6px

    .stats
        flex: 1
        display: flex
        flex-flow: row wrap
        gap: 10px

        span
            flex-shrink: 0
            display: flex
            align-items: center
            gap: 2px

    .tag-list
        flex: 1
        width: 500px
        height: 30px

        overflow: hidden

        display: flex
        flex-flow: row wrap
        align-items: center
        gap: 1px


    .desc
        flex: 3
        margin: 0
        padding: 0.2em 0.5em

        white-space: normal
        word-wrap: break-word
        overflow-wrap: break-word

        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 3 /* 표시할 줄 수 */
        -webkit-box-orient: vertical
</style>
