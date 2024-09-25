<template>
    <section class="root">
        <div class="structure base-wrapper">
            <CoverImg class="cover" :img-url="novel.thumbnailUrl" :alt="novel.title"></CoverImg>
            <div class="info">
                <section class="detail">
                    <h1 class="title">{{ novel.title }}</h1>
                    <h2 class="author">
                        <span>작가</span>
                        <a href="#">{{ novel.authorName }}</a>
                    </h2>
                </section>
                <section class="stats">
                    <span> <Eye /> {{ novel.views }} </span>
                    <span>
                        <Heart
                            class="favorite-button"
                            :fill="favoriteButtonStyle.fill"
                            :color="favoriteButtonStyle.color"
                            @click="toggleFavorite"
                        />
                        {{ novel.favoriteCount }}
                    </span>
                    <span>
                        <MessageCircleHeart />
                        {{ novel.averageRating }}
                    </span>
                </section>
                <section class="tag-list">
                    <Tag
                        class="tag"
                        v-for="tag in novel.tags"
                        :key="tag.id"
                        :tag="tag"
                        :block-style="true"
                    ></Tag>
                </section>
                <section class="description">
                    <h3>작품 소개</h3>
                    <p>{{ novel.desc }}</p>
                </section>
            </div>
        </div>
    </section>
</template>

<script setup>
import Tag from "@/components/reusable/Tag.vue";
import CoverImg from "@/components/reusable/CoverImg.vue";

import { ref, onMounted, computed } from "vue";
import { Eye, Heart, MessageCircleHeart } from "lucide-vue-next";
import { novelApi, memberApi } from "@/hooks/backendApi";

//novel id 값
// url parameter 가져오기
const props = defineProps({
    novelId: {
        type: Number,
        required: true,
    },
});

//default novel 데이터
const novel = ref({});

//선호작 여부
const isFavorite = ref(false);

const rootStyles = getComputedStyle(document.documentElement);
const favoriteButtonStyle = computed(() => {
    if (isFavorite.value) {
        return {
            color: rootStyles.getPropertyValue("--pico-primary-background"),
            fill: rootStyles.getPropertyValue("--pico-primary-background"),
        };
    } else {
        return {
            color: "currentColor",
            fill: "transparent",
        };
    }
});

function setFavoriteState(state) {
    isFavorite.value = state;
    novel.value.favoriteCount += state ? 1 : -1;
}

//선호작 설정/해제 설정
async function toggleFavorite() {
    try {
        const afterState = await memberApi.toggleNovelFavorite(props.novelId);
        setFavoriteState(afterState);
    } catch (error) {
        console.error("Failed to toggle favorite state: ", error);
    }
}

//선호작 상태 가져오기
async function checkFavorite() {
    try {
        const checked = await memberApi.getCheckFavorite(props.novelId);
        isFavorite.value = checked;
    } catch (error) {
        console.error("Failed to confirm favorite state: ", error);
        isFavorite.value = false;
    }
}

async function loadNovel() {
    try {
        const data = await novelApi.getNovel(props.novelId);
        novel.value = data;
    } catch (erorr) {
        console.error("Failed to load novel info: ", error);
        novel.value = {
            id: 0,
            title: "ERROR",
            authorName: "ERROR",
            desc: `ERROR`,
            views: 0,
            averageRating: 0,
            favoriteCount: 0,
            episodeCount: 0,
            tags: [{ id: 0, name: "ERROR" }],
            status: "",
            thumbnailUrl: "",
        };
    }
}

//api 적용
onMounted(() => {
    loadNovel();
    checkFavorite();
});
</script>

<style scoped lang="sass">


.root
    padding-top: 40px
    padding-bottom: 20px
    border-bottom: 20px solid var(--bg-sub)

.structure
    margin-bottom: 0px

    display: flex
    justify-content: flex-start
    flex-direction: row
    flex-wrap: nowrap
    gap: 40px


.cover
    width: 300px
    height: 400px
    flex-shrink: 0
    flex-grow: 0
    border-radius: 5px
    background-color: gray
    overflow: hidden
    cursor: pointer

    img
        width: 100%
        height: 100%
        object-fit: cover
        object-position: center
        transition: transform 0.6s ease // 부드러운 확대 효과를 위한 전환

        &:hover
            transform: scale(1.1) // 마우스 오버 시 이미지 확대


.info
    position: relative
    flex-grow: 1
    font-size: 16px


    section
        margin-bottom: 20px

        > *
            margin-bottom: 10px

    .detail
        .title
            font-size: 38px
            font-weight: 800


        .author
            font-size: 16px
            font-weight: 700

            span
                margin-right: 5px

            a
                text-decoration: none
                color: var(--primary-color)


    .stats
        display: flex
        flex-direction: row
        gap: 15px

        *
            height: 25px

        > span
            color: var(--text-basic)
            font-size: 16px
            display: flex
            align-items: center
            gap: 2px

        .favorite-button
            cursor: pointer
            transition: all 0.3s ease
            &:hover
                transform: scale(1.2)

    .tag-list
        display: flex
        flex-flow: row wrap
        gap: 10px

        .tag
            font-size: 12px

    .description
        width: 100%
        padding: 15px
        border-radius: 10px
        background-color: var(--bg-sub)

        h3
            font-size: 16px

        p
            word-wrap: break-word
            overflow-wrap: break-word
            font-size: 15px
</style>
