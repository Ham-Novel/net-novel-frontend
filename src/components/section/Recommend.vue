<template>
    <BaseSection>
        <template #title>
            <ThumbsUp />
            <span>Recommend</span>
        </template>
        <template #default>
            <div class="recommended-novels">
                <div v-for="i in 6" :key="i" class="novel">
                    <!-- 추천 작품 내용 -->
                </div>
            </div>
        </template>
    </BaseSection>
</template>

<style scoped>
.recommended-novels {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem;
}

/* 나머지 스타일 */
</style>

<script setup>
import { ref } from "vue";
import { ThumbsUp } from "lucide-vue-next";
</script>
