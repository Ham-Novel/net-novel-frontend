<template>
    <article class="novel-item">
        <div class="novel-cover" @click="goToNovelPage">
            <img :src="props.imgUrl" />
        </div>
        <div class="novel-info">
            <h3 class="title" @click="goToNovelPage">
                {{ props.title }}
            </h3>
            <slot></slot>
        </div>
    </article>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    width: {
        type: String,
        default: "50px",
    },
    height: {
        type: String,
        default: "50px",
    },
    title: {
        type: String,
        default: "TitLe",
    },
    imgUrl: {
        type: String,
        default: "/public/test_cover.jpeg",
    },
    novelId: {
        type: Number,
        default: 0,
    },
});

//Item의 크기와 넓이 css 값으로 format
const styleWidth = ref(props.width);
const styleHeight = ref(props.height);

//클릭하면 해당 id 값의 NovelPage로 이동
const router = useRouter();
function goToNovelPage() {
    router.push(`/novels/${props.novelId}`);
}

onMounted(() => {
    console.log();
});
</script>

<style scoped lang="sass">

.novel-item
    width: v-bind(styleWidth)
    height: v-bind(styleHeight)
    display: flex

    //안으로 tab
    .novel-cover
        border-radius: 5px
        background-color: gray
        overflow: hidden
        cursor: pointer

        img
            width: 100%
            height: 100%
            object-fit: cover
            object-position: center
            transition: transform 0.3s ease // 부드러운 확대 효과를 위한 전환

            &:hover
                transform: scale(1.1) // 마우스 오버 시 이미지 확대

    .novel-info
        position: relative
        flex: 1

        .title
            display: inline-block
            font-size: 18px
            font-weight: bold
            cursor: pointer

            &:hover
                text-decoration: underline
</style>
