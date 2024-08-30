<template>
    <section class="novel-info-section base-distance">
        <div class="novel-division base-wrapper">
            <div class="novel-cover">
                <img :src="novel.thumbnailUrl" :alt="novel.title" />
            </div>
            <div class="novel-info">
                <figure class="novel-detail novel-info-figure">
                    <h1 class="novel-title">{{ novel.title }}</h1>
                    <h2 class="novel-author">
                        <span>작가</span>
                        <a href="#">{{ novel.authorName }}</a>
                    </h2>
                </figure>
                <figure class="novel-stats novel-info-figure">
                    <span> <View /> {{ novel.views }} </span>
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
                </figure>
                <figure class="novel-tags novel-info-figure">
                    <span v-for="tag in novel.tags" :key="tag.id" class="tag">#{{ tag.name }}</span>
                </figure>
                <figure class="novel-description novel-info-figure">
                    <h3>작품 소개</h3>
                    <p>{{ novel.desc }}</p>
                </figure>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, reactive, computed, readonly, inject } from "vue";
import { View, Heart, MessageCircleHeart } from "lucide-vue-next";
import { novelApi, memberApi } from "@/hooks/backendApi";

//novel id 값
const novelId = inject("novelId");

//default novel 데이터
const novel = ref({
    id: 0,
    title: "",
    authorName: "",
    desc: ``,
    views: 0,
    averageRating: 0,
    favoriteCount: 0,
    episodeCount: 0,
    tags: [],
    status: "",
    thumbnailUrl: "/cover/lightnovel_cover.jpeg",
});

//선호작 여부
const isFavorite = ref(false);

const favoriteButtonStyle = computed(() => {
    if (isFavorite.value) {
        return {
            color: "red",
            fill: "red",
        };
    } else {
        return {
            color: "black",
            fill: "transparent",
        };
    }
});

//선호작 설정 메서드
function toggleFavorite() {
    memberApi.toggleNovelFavorite(props.novelId).then((check) => {
        console.log(check);
        isFavorite.value = check;
        if (check) {
            novel.value.favoriteCount++;
        } else {
            novel.value.favoriteCount--;
        }
    });
}

//api 적용
onMounted(() => {
    novelApi.getNovel(novelId).then((loadData) => {
        // console.log(loadData);
        novel.value = loadData;
    });
    memberApi.getCheckFavorite(novelId).then((check) => {
        // console.log(check);
        isFavorite.value = check;
    });
});
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"

.novel-division
    display: flex
    justify-content: flex-start
    flex-direction: row
    flex-wrap: nowrap
    gap: 30px


.novel-info-section
    background-color: #f5f6fc
    padding-top: 30px

    .novel-cover
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


.novel-info
    position: relative
    box-sizing: border-box
    flex-grow: 1

    .novel-info-figure
        margin-bottom: 20px

        > *
            margin-bottom: 10px

    .novel-detail
        .novel-title
            font-size: 35px
            font-weight: bold


        .novel-author
            font-size: 15px

            span
                margin-right: 5px

            .a
                text-decoration: none
                color: #4a90e2
                font-weight: bold


    .novel-stats
        font-size: 17px
        display: flex
        flex-direction: row
        gap: 15px

        *
            height: 25px

        > span
            color: black
            display: flex
            align-items: center
            gap: 3px

        .favorite-button
            cursor: pointer
            transition: all 0.3s ease
            &:hover
                transform: scale(1.2)
            &:active
                transform: scale(0.8)
                box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1)

    .novel-tags
        .tag
            background-color: #e0e0e0
            padding: 5px 5px
            border-radius: 5px
            margin-right: 6px
            font-size: 12px
            cursor: pointer

    .novel-description
        width: 80%

        p
            box-sizing: border-box
            word-wrap: break-word
            overflow-wrap: break-word
            max-width: 100%

    .features
        position: absolute
        right: 30px
        top: 30px
        display: flex
        flex-flow: row nowrap
        gap: 30px

        *
            height: 30px

.read-button
    width: 100px
    background-color: #4f46e5
    color: white
    border-radius: 5px
    cursor: pointer
</style>
