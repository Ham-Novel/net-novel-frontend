<template>
    <section class="item">
        <div class="cover" @click="goLinkPage">
            <img :src="props.coverImg" />
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
    aspect-ratio: 3 / 4
    position: relative
    border-radius: 5px
    background-color: gray
    overflow: hidden
    cursor: pointer
    flex: 0 0 auto

    img
        width: 100%
        height: 100%
        object-fit: cover
        object-position: center
        transition: transform 0.3s ease // 부드러운 확대 효과를 위한 전환

        &:hover
            transform: scale(1.1) // 마우스 오버 시 이미지 확대

.info
    position: relative
    flex: 1 0 auto

    .title
        display: inline-block
        font-size: 22px
        font-weight: bold
        cursor: pointer

        &:hover
            text-decoration: underline
</style>
