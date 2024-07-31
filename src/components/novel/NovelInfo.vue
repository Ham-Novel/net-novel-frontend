<template>
    <section class="base-distance">
        <div class="novel-division base-wrapper">
            <figcaption class="novel-cover">
                <img :src="novel.coverImage" :alt="novel.title" />
            </figcaption>
            <figure class="novel-info">
                <div class="novel-detail novel-info-section">
                    <h1 class="novel-title">{{ novel.title }}</h1>
                    <h2 class="novel-author">
                        <span>작가</span>
                        <a href="#">{{ novel.author }}</a>
                    </h2>
                    <p class="novel-stats">
                        <span>조회수 {{ novel.view }}</span>
                        <span>선호작 {{ novel.favoriteAmount }}</span>
                        <span>별점</span>
                    </p>
                </div>
                <div class="novel-tags novel-info-section">
                    <span v-for="tag in novel.tags" :key="tag" class="tag"
                        >#{{ tag }}</span
                    >
                </div>
                <div class="novel-description novel-info-section">
                    <h3>작품 소개</h3>
                    <p>{{ novel.description }}</p>
                </div>
            </figure>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import novelAPI from "@/serverApi";
import EpisodeList from "./NovelEpiList.vue";

const props = defineProps(["novelclass"]);

const novel = ref({
    title: "웹소설 제목",
    author: "유저 이름",
    description: `
    Laborum aute Lorem occaecat et anim ad consequat magna reprehenderit non eu enim. Minim duis nulla eu elit ut tempor magna tempor occaecat excepteur. Fugiat magna aute sunt nulla do cillum pariatur. Ad deserunt commodo ex non culpa magna eiusmod. Nostrud veniam et consectetur sunt deserunt nulla laboris nisi consectetur aliquip proclassent excepteur consectetur cillum. Incclassclassunt irure deserunt velit commodo dolor dolore amet aute.
    `,
    status: "ONGOING",
    episodeAmount: 1,
    favoriteAmount: 1,
    view: 0,
    tags: ["태그1", "태그2", "태그3"],
    coverImage: "path_to_cover_image.jpg",
});

async function loadNovel() {
    try {
        let resp = await novelAPI.getNovel(props.novelclass);
        console.log(resp);
        novel.value = resp;
    } catch (error) {
        console.error("Error fetching novels:", error);
    }
}

onMounted(() => {
    loadNovel().then();
});
</script>

<style scoped>
@import "@/assets/section.css";

section {
    background-color: #f5f6fc;
    padding-top: 20px;
}

.novel-division {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 30px;
}

.novel-cover {
    width: 300px;
    height: 400px;
    flex-shrink: 0;
    flex-grow: 0;
    object-fit: cover;
    border-radius: 5px;
    background-color: #e0e0e0;
}

.novel-info {
    position: relative;
    box-sizing: border-box;
}

.novel-info-section {
    margin-bottom: 30px;
}

.novel-info-section > * {
    margin-bottom: 5px;
}

.novel-title {
    font-size: 35px;
    font-weight: bold;
}

.novel-stats {
    font-size: 15px;
}

.novel-stats > span {
    margin-right: 20px;
    color: black;
}

.novel-author {
    font-size: 15px;
}

.novel-author span {
    margin-right: 5px;
}

.novel-author a {
    text-decoration: none;
    color: #4a90e2;
    font-weight: bold;
}

.novel-tags {
    /* margin-bottom: 40px; */
}

.tag {
    background-color: #4f46e5;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 10px;
    font-size: 14px;
}

.novel-description {
    width: 80%;
}

.novel-description p {
    box-sizing: border-box;
    word-wrap: break-word; /* 이 줄을 추가합니다 */
    overflow-wrap: break-word; /* 이 줄을 추가합니다 */
    max-width: 100%; /* 이 줄을 추가합니다 */
}

.read-button {
    width: 200px;
    height: 40px;
    background-color: #4f46e5;
    color: white;
    /* padding: 10px 20px; */
    border-radius: 5px;
    cursor: pointer;
}
</style>
