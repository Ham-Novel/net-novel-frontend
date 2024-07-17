<template>
    <BaseSection>
        <template #title>
            <Clock />
            <span>Recent Updated</span>
        </template>
        <template #default>
            <ul>
                <li v-for="i in 5" :key="i">
                    <!-- 최근 업데이트 작품 내용 -->
                </li>
            </ul>
        </template>
    </BaseSection>
</template>

<style scoped>
.recent-updated ul {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 나머지 스타일 */
</style>

<script setup>
import { ref } from "vue";
import { Clock } from "lucide-vue-next";
</script>
