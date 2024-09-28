<template>
    <article class="item">
        <div class="cover" @click="goLinkPage">
            <CoverImg class="img" :img-url="props.brief?.coverImg"></CoverImg>
            <slot name="cover"></slot>
        </div>
        <div class="info">
            <h4 class="title" @click="goLinkPage">
                {{ props.brief?.title }}
            </h4>
            <div class="detail">
                <slot></slot>
            </div>
        </div>
    </article>
</template>

<script setup>
import CoverImg from "../CoverImg.vue";
import { useRouter } from "vue-router";

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

//클릭하면 해당 id 값의 Page로 이동
const router = useRouter();
function goLinkPage() {
    router.push(props.link);
}
</script>

<style scoped lang="sass">
article
    padding: 0.3em

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

    display: flex
    flex-flow: row nowrap

    .title
        display: inline-block
        font-size: 22px
        font-weight: bold
        cursor: pointer
        overflow: hidden

        &:hover
            text-decoration: underline

    .detail
        flex: 1
</style>
