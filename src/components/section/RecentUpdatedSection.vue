<template>
    <section class="recent-updated">
        <h2><Clock /> Recent Updated</h2>
        <ul>
            <li v-for="i in 5" :key="i">
                <!-- 최근 업데이트 작품 내용 -->
            </li>
        </ul>
    </section>
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
