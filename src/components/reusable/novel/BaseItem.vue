<template>
    <section class="item">
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
    </section>
</template>

<script setup>
import CoverImg from "../CoverImg.vue";
import { onMounted, ref } from "vue";
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

//클릭하면 해당 id 값의 NovelPage로 이동
const router = useRouter();
function goLinkPage() {
    console.log(props.link);
    router.push(props.link);
}

onMounted(() => {});
</script>

<style scoped lang="sass">
.item
    width: 200px
    height: 100px
    position: relative
    display: flex
    flex-flow: row nowrap
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
    position: relative
    flex: 1

    .title
        display: inline-block
        font-size: 22px
        font-weight: bold
        cursor: pointer

        &:hover
            text-decoration: underline
</style>
