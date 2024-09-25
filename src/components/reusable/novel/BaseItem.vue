<template>
    <article class="item">
        <div class="cover" @click="goLinkPage">
            <CoverImg class="img" :img-url="props.coverImg"></CoverImg>
            <slot name="cover"></slot>
        </div>
        <div class="info">
            <h3 class="title" @click="goLinkPage">
                {{ props.title }}
            </h3>
            <slot></slot>
        </div>
    </article>
</template>

<script setup>
import CoverImg from "../CoverImg.vue";
import { useRouter } from "vue-router";

const props = defineProps({
    title: {
        type: String,
        default: "Title",
    },
    coverImg: {
        type: String,
        default: "",
    },
    link: {
        type: Object,
        required: true,
    },
});

//클릭하면 해당 id 값의 Page로 이동
const router = useRouter();
function goLinkPage() {
    router.push(props.link);
}
</script>

<style scoped lang="sass">

article
    padding: 0

.item
    width: 200px
    height: auto
    position: relative
    display: flex
    flex-flow: column nowrap
    align-items: stretch
    gap: 10px

.cover
    position: relative
    aspect-ratio: 3 / 4
    overflow: hidden
    border-radius: 5px
    flex: 0 0 auto

    .img
        width: 100%
        height: 100%

.info
    flex: 1
    position: relative
    overflow: hidden
    white-space: nowrap

    .title
        display: inline-block
        font-size: 22px
        font-weight: bold
        cursor: pointer

        &:hover
            text-decoration: underline
</style>
