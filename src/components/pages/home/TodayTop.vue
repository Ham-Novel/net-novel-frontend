<template>
    <BaseSection>
        <template #title>
            <TrendingUp class="icon" />
            <span>Today Top</span>
        </template>
        <template #default>
            <div class="novel-grid">
                <div class="novel-card top-novel">
                    <div class="novel-content">
                        <div class="novel-cover"></div>
                        <div class="novel-info">
                            <div class="novel-rank">#1</div>
                            <h3 class="novel-title">{{ topNovel.title }}</h3>
                            <p class="novel-author">{{ topNovel.author }}</p>
                            <p class="novel-description">
                                {{ topNovel.description }}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    v-for="rank in [2, 3, 4, 5, 6]"
                    :key="rank"
                    class="novel-card middle-novel"
                >
                    <div class="novel-cover"></div>
                    <div class="novel-rank">#{{ rank }}</div>
                    <h3 class="novel-title">인기 웹소설 {{ rank }}</h3>
                    <p class="novel-author">작가 이름</p>
                </div>
            </div>
        </template>
    </BaseSection>
</template>

<script setup>
import BaseSection from "./BaseSection.vue";

import { ref } from "vue";
import { TrendingUp } from "lucide-vue-next";

const topNovel = ref({
    title: "인기 웹소설 1",
    author: "작가 이름",
    description:
        "간단한 작품 소개가 여기에 들어갑니다. 이 작품은 현재 가장 인기 있는 웹소설입니다.",
});
</script>

<style scoped>
h2 {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.novel-grid {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(4, minmax(100px, 1fr));
    gap: 10px;
    height: 500px;
}

.top-novel {
    grid-column: 1 / 4;
}

.novel-card {
    background-color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
}

.novel-card:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.novel-cover {
    background-color: #e5e7eb;
    border-radius: 0.25rem;
    margin-bottom: 0.75rem;
}

.novel-rank {
    font-size: 1.5rem;
    font-weight: bold;
    color: #4f46e5;
    margin-bottom: 0.25rem;
}

.novel-author {
    font-size: 0.875rem;
    color: #4b5563;
}

.novel-title {
    font-weight: 500;
    margin-bottom: 0.25rem;
}

.novel-description {
    font-size: 0.875rem;
    color: #6b7280;
    overflow: hidden; /* 넘치는 텍스트 숨기기 */
    text-overflow: ellipsis; /* 넘치는 텍스트에 '...' 표시 */
}

.novel-content {
    display: flex;
    width: 100%;
    height: 100%;
}
.novel-info {
    width: 100%;
    height: 100%;
}

.middle-novel .novel-cover {
    width: 100%;
    height: 50%;
}

.top-novel .novel-cover {
    width: 66.666%;
    margin-right: 1rem;
}

.top-novel .novel-info {
    width: 33.333%;
}

.top-novel .novel-rank {
    font-size: 1.875rem;
}

.top-novel .novel-title {
    font-size: 1.25rem;
}
</style>
