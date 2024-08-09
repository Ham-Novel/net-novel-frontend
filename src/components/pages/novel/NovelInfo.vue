<template>
    <section class="novel-info-section base-distance">
        <div class="novel-division base-wrapper">
            <img class="novel-cover" src="" :alt="novel.title" />
            <div class="novel-info">
                <figure class="novel-detail novel-info-figure">
                    <h1 class="novel-title">{{ novel.title }}</h1>
                    <h2 class="novel-author">
                        <span>작가</span>
                        <a href="#">{{ novel.authorName }}</a>
                    </h2>
                    <p class="novel-stats">
                        <span> <View size="18" /> {{ novel.views }} </span>
                        <span>
                            <Star size="18" /> {{ novel.favoriteCount }}
                        </span>
                        <span>
                            <MessageCircleHeart size="18" />
                            {{ novel.averageRating }}
                        </span>
                    </p>
                </figure>
                <figure class="novel-tags novel-info-figure">
                    <span v-for="tag in novel.tags" :key="tag.id" class="tag"
                        >#{{ tag.name }}</span
                    >
                </figure>
                <figure class="novel-description novel-info-figure">
                    <h3>작품 소개</h3>
                    <p>{{ novel.description }}</p>
                </figure>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { View, Star, MessageCircleHeart } from "lucide-vue-next";
import { novelApi, tagApi } from "@/backendApi";

const props = defineProps(["novelId"]);

//default novel 데이터
const novel = ref({
    title: "웹소설 제목",
    authorName: "유저 이름",
    description: `
    Laborum aute Lorem occaecat et anim ad consequat magna reprehenderit non eu enim. Minim duis nulla eu elit ut tempor magna tempor occaecat excepteur. Fugiat magna aute sunt nulla do cillum pariatur. Ad deserunt commodo ex non culpa magna eiusmod. Nostrud veniam et consectetur sunt deserunt nulla laboris nisi consectetur aliquip proclassent excepteur consectetur cillum. Incclassclassunt irure deserunt velit commodo dolor dolore amet aute.
    `,
    views: 100,
    averageRating: 10,
    favoriteCount: 15,
    episodeCount: 0,
    tags: [],
    status: "ONGOING",
    // coverImage: "path_to_cover_image.jpg",
});

// const tags = reactive([]);

function loadNovel() {
    novelApi.getNovel(props.novelId).then((loadData) => {
        console.log(loadData);
        novel.value = loadData;
    });
}

// function loadTags() {
//     tagApi.getTagsByNovel(props.novelId).then((items) => {
//         console.log(items);
//         tags.push(...items);
//     });
// }

onMounted(() => {
    loadNovel();
    // loadTags();
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
        object-fit: cover
        border-radius: 5px
        background-color: #e0e0e0


.novel-info
    position: relative
    box-sizing: border-box
    flex-grow: 1

    .novel-info-figure
        margin-bottom: 30px

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
            font-size: 15px
            display: flex
            flex-direction: row
            gap: 15px

            > span
                color: black
                display: flex
                align-items: center
                gap: 3px

    .novel-tags
        .tag
            background-color: #e0e0e0
            padding: 5px 5px
            border-radius: 5px
            margin-right: 6px
            font-size: 12px

    .novel-description
        width: 80%

        p
            box-sizing: border-box
            word-wrap: break-word
            overflow-wrap: break-word
            max-width: 100%

.read-button
    width: 200px
    height: 40px
    background-color: #4f46e5
    color: white
    border-radius: 5px
    cursor: pointer
</style>
