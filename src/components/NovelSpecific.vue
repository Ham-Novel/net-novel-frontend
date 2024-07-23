<template>
    <div class="novel-detail">
        <div class="novel-main-info">
            <img
                :src="novel.coverImage"
                :alt="novel.title"
                class="novel-cover"
            />
            <div class="novel-info">
                <h1 class="novel-title">{{ novel.title }}</h1>
                <p class="novel-author">{{ novel.author }}</p>
                <div class="novel-stats">
                    <p>조회 {{ novel.views }}</p>
                    <p>인기도 {{ novel.rank }}</p>
                </div>
                <div class="share-icon"></div>
            </div>
        </div>

        <div class="novel-tags">
            <span v-for="tag in novel.tags" :key="tag" class="tag"
                >#{{ tag }}</span
            >
        </div>

        <div class="novel-synopsis">
            <h3>작품 소개</h3>
            <p>{{ novel.synopsis }}</p>
        </div>

        <div class="novel-engagement">
            <div class="engagement-stat">
                <i class="far fa-heart"></i>
                <span>관심 {{ novel.likes }}</span>
            </div>
            <div class="engagement-stat">
                <i class="far fa-comment"></i>
                <span>회차 {{ novel.chapters }}화</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import novelAPI from "@/serverApi";

const novel = ref({
    title: "웹소설 제목",
    author: "유저 이름",
    coverImage: "path_to_cover_image.jpg",
    views: 0,
    rank: 0,
    tags: ["태그1", "태그2", "태그3"],
    synopsis: "작품 소개글이 쓰여집니다.",
    likes: 1,
    chapters: 1,
});

async function loadNovel() {
    const TEST_NOVEL_ID = 4;
    try {
        let resp = await novelAPI.getNovel(TEST_NOVEL_ID);
        console.log(resp);
        novel.value = resp;
    } catch (error) {
        console.error("Error fetching novels:", error);
    }
}

async function setNovel() {
    const newNovel = {
        title: "새로운 소설",
        description: "새로운 소설의 작품 소개입니다.",
        authorProviderId: "ZoCL_bBiUsui80c1xqldjrcn7G0EZytvTF8UOVOdDEI",
    };

    try {
        let resp = await novelAPI.createNovel(newNovel);
        console.log(resp);
        novel.value = resp;
    } catch (error) {
        console.error("Error fetching novels:", error);
    }
}

onMounted(() => {
    setNovel().then();
    // loadNovel().then();
});
</script>

<style scoped>
.novel-detail {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.novel-main-info {
    display: flex;
    margin-bottom: 20px;
}

.novel-cover {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    background-color: #e0e0e0;
}

.novel-info {
    margin-left: 20px;
    flex-grow: 1;
}

.novel-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.novel-author {
    color: #666;
    margin-bottom: 10px;
}

.badge {
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: bold;
    margin-right: 10px;
}

.plus {
    background-color: #8b00ff;
    color: white;
}

.exclusive {
    background-color: #4a90e2;
    color: white;
}

.novel-stats {
    margin-bottom: 10px;
}

.novel-stats span {
    margin-right: 15px;
    color: #666;
}

.read-button {
    background-color: #4a90e2;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.share-icon {
    float: right;
    cursor: pointer;
}

.novel-tags {
    margin-bottom: 20px;
}

.tag {
    background-color: #f0f0f0;
    padding: 5px 10px;
    border-radius: 15px;
    margin-right: 10px;
    font-size: 14px;
}

.novel-synopsis {
    margin-bottom: 20px;
}

.more-button {
    background: none;
    border: none;
    color: #4a90e2;
    cursor: pointer;
}

.novel-engagement {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #e0e0e0;
    padding-top: 20px;
}

.engagement-stat {
    text-align: center;
}

.engagement-stat i {
    display: block;
    font-size: 24px;
    margin-bottom: 5px;
}
</style>
