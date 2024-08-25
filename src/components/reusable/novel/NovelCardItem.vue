<template>
    <article class="novel-item">
        <div class="novel-cover" @click="goToNovelPage">
            <img :src="props.brief.coverImg" />
        </div>
        <div class="novel-info">
            <h3 class="title" @click="goToNovelPage">
                {{ props.brief.title }}
            </h3>
            <slot></slot>
        </div>
    </article>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    size: {
        type: Object,
        default: {
            width: "160px",
            height: "260px",
        },
    },
    brief: {
        type: Object,
        default: {
            id: undefined,
            title: "NovelListItem",
            coverImg: "/cover/fantasy_cover.jpeg",
        },
    },
});

//Item의 크기와 넓이 css 값으로 format
const styleWidth = ref(props.size.width);
const styleHeight = ref(props.size.height);

//클릭하면 해당 id 값의 NovelPage로 이동
const router = useRouter();
function goToNovelPage() {
    router.push({ name: "novel-episode", params: { id: props.brief.id } });
}

onMounted(() => {});
</script>

<style scoped lang="sass">

.novel-item
    width: v-bind(styleWidth)
    height: v-bind(styleHeight)
    display: flex
    flex-direction: column
    align-items: stretch
    gap: 10px

    .novel-cover
        flex: 3
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
        display: flex
        flex-direction: column
        justify-content: flex-start
        gap: 5px

        .title
            display: inline-block
            font-size: 22px
            font-weight: bold
            cursor: pointer
            align-self: flex-start //flex item을 inline으로 가능

            &:hover
                text-decoration: underline
</style>
