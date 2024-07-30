<template>
    <section>
        <img :src="novel.coverImage" :alt="novel.title" class="novel-cover" />
        <div class="novel-detail">
            <h1 class="novel-title">{{ novel.title }}</h1>
            <p class="novel-stats">
                <span>조회수 {{ novel.view }}</span>
                <span>선호작 {{ novel.favoriteAmount }}</span>
                <span>별점</span>
            </p>
            <h2 class="novel-author">
                <span>작가</span>
                <a href="#">{{ novel.author }}</a>
            </h2>
            <div class="novel-tags">
                <span v-for="tag in novel.tags" :key="tag" class="tag"
                    >#{{ tag }}</span
                >
            </div>
            <div class="novel-description">
                <h3>작품 소개</h3>
                <p>{{ novel.description }}</p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import novelAPI from "@/serverApi";
import EpisodeList from "./NovelEpiList.vue";

const props = defineProps({
    novelId: {
        type: Number,
        required: true,
    },
});

const novel = ref({
    title: "웹소설 제목",
    author: "유저 이름",
    description: `
    Laborum aute Lorem occaecat et anim ad consequat magna reprehenderit non eu enim. Minim duis nulla eu elit ut tempor magna tempor occaecat excepteur. Fugiat magna aute sunt nulla do cillum pariatur. Ad deserunt commodo ex non culpa magna eiusmod. Nostrud veniam et consectetur sunt deserunt nulla laboris nisi consectetur aliquip proident excepteur consectetur cillum. Incididunt irure deserunt velit commodo dolor dolore amet aute.
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
        let resp = await novelAPI.getNovel(1);
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
section {
    font-family: Arial, sans-serif;
    margin-top: 30px;
    margin-bottom: 30px;
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
    border-radius: 10px;
    background-color: #e0e0e0;
}

.novel-detail {
    position: relative;
    box-sizing: border-box;
}

.novel-title {
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 10px;
}

.novel-stats {
    margin-bottom: 10px;
    font-size: 15px;
}

.novel-stats span {
    margin-right: 20px;
    color: black;
}

.novel-author {
    margin-bottom: 20px;
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
    margin-bottom: 40px;
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
    width: 100%;
}

.novel-description h3 {
    margin-bottom: 10px;
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

/* .more-button {
    background: none;
    border: none;
    color: #4a90e2;
    cursor: pointer;
} */
</style>
