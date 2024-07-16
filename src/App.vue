<template>
    <div class="app">
        <header>
            <div class="container header-content">
                <h1>Netnovel</h1>
                <nav>
                    <ul>
                        <li v-for="item in menuItems" :key="item">
                            <a href="#">{{ item }}</a>
                        </li>
                    </ul>
                </nav>
                <div class="icons">
                    <Search />
                    <BookOpen />
                    <User />
                </div>
            </div>
        </header>

        <main class="container">
            <section class="today-top">
                <h2><TrendingUp /> Today Top</h2>
                <div class="top-novels">
                    <!-- 1등 작품 -->
                    <div class="top-novel first">
                        <div class="cover"></div>
                        <div class="info">
                            <div class="rank">#1</div>
                            <h3>인기 웹소설 1</h3>
                            <p class="author">작가 이름</p>
                            <p class="description">
                                간단한 작품 소개가 여기에 들어갑니다. 이 작품은
                                현재 가장 인기 있는 웹소설입니다.
                            </p>
                        </div>
                    </div>

                    <!-- 2-3등 작품 -->
                    <div v-for="rank in [2, 3]" :key="rank" class="top-novel">
                        <div class="cover"></div>
                        <div class="rank">#{{ rank }}</div>
                        <h3>인기 웹소설 {{ rank }}</h3>
                        <p class="author">작가 이름</p>
                    </div>

                    <!-- 4-6등 작품 -->
                    <div
                        v-for="rank in [4, 5, 6]"
                        :key="rank"
                        class="top-novel small"
                    >
                        <div class="cover"></div>
                        <div class="rank">#{{ rank }}</div>
                        <h3>인기 웹소설 {{ rank }}</h3>
                        <p class="author">작가 이름</p>
                    </div>
                </div>
            </section>

            <section class="recommended">
                <h2><ThumbsUp /> Recommended</h2>
                <div class="recommended-novels">
                    <div v-for="i in 6" :key="i" class="novel">
                        <div class="cover"></div>
                        <h3>추천 웹소설 {{ i }}</h3>
                        <p class="author">작가 이름</p>
                    </div>
                </div>
            </section>

            <section class="recent-updated">
                <h2><Clock /> Recent Updated</h2>
                <ul>
                    <li v-for="i in 5" :key="i">
                        <div class="cover"></div>
                        <div class="info">
                            <h3>웹소설 제목 {{ i }}</h3>
                            <p class="author">작가 이름</p>
                        </div>
                        <span class="chapter">{{ 51 - i }}화</span>
                    </li>
                </ul>
            </section>
        </main>

        <footer>
            <div class="container">
                &copy; 2024 Netnovel. All rights reserved.
            </div>
        </footer>
    </div>
</template>

<script setup>
// import { ref } from "vue";
// import {
//     Search,
//     BookOpen,
//     User,
//     TrendingUp,
//     ThumbsUp,
//     Clock,
// } from "lucide-vue-next";

// const menuItems = ref(["Browse", "Ranking", "New"]);
</script>

<style scoped>
.app {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f3f4f6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

header {
    background-color: #4f46e5;
    color: white;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

h1 {
    font-size: 1.5rem;
    font-weight: bold;
}

nav ul {
    display: flex;
    list-style-type: none;
    gap: 1.5rem;
}

nav a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
}

nav a:hover {
    color: #818cf8;
}

.icons {
    display: flex;
    gap: 1rem;
}

main {
    flex-grow: 1;
    padding: 2rem 0;
}

section {
    margin-bottom: 2rem;
}

h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
}

h2 svg {
    margin-right: 0.5rem;
    color: #4f46e5;
}

.top-novels {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
}

.top-novel {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
}

.top-novel:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.top-novel.first {
    grid-column: span 6;
    display: flex;
}

.top-novel:not(.first):not(.small) {
    grid-column: span 3;
}

.top-novel.small {
    grid-column: span 2;
}

.cover {
    background-color: #e5e7eb;
    aspect-ratio: 2 / 3;
    border-radius: 0.25rem;
}

.first .cover {
    width: 40%;
    margin-right: 1rem;
}

.rank {
    font-size: 1.25rem;
    font-weight: bold;
    color: #4f46e5;
    margin-bottom: 0.5rem;
}

.first .rank {
    font-size: 1.5rem;
}

h3 {
    font-weight: 500;
    margin-bottom: 0.25rem;
}

.author {
    font-size: 0.875rem;
    color: #6b7280;
}

.description {
    font-size: 0.875rem;
    color: #4b5563;
    margin-top: 0.5rem;
}

.recommended-novels {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem;
}

.recent-updated ul {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.recent-updated li {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e5e7eb;
}

.recent-updated li:last-child {
    border-bottom: none;
}

.recent-updated .cover {
    width: 3rem;
    height: 4rem;
    margin-right: 1rem;
    flex-shrink: 0;
}

.recent-updated .info {
    flex-grow: 1;
}

.recent-updated .chapter {
    color: #4f46e5;
    font-weight: 600;
}

footer {
    background-color: #1f2937;
    color: white;
    padding: 1rem 0;
    text-align: center;
}

@media (max-width: 1200px) {
    .top-novel.first {
        grid-column: span 8;
    }
    .top-novel:not(.first):not(.small) {
        grid-column: span 4;
    }
    .top-novel.small {
        grid-column: span 3;
    }
    .recommended-novels {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 992px) {
    .top-novel.first {
        grid-column: span 12;
    }
    .top-novel:not(.first):not(.small) {
        grid-column: span 6;
    }
    .top-novel.small {
        grid-column: span 4;
    }
    .recommended-novels {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .top-novels {
        grid-template-columns: repeat(6, 1fr);
    }
    .top-novel.first {
        grid-column: span 6;
        flex-direction: column;
    }
    .first .cover {
        width: 100%;
        margin-right: 0;
        margin-bottom: 1rem;
    }
    .top-novel:not(.first):not(.small) {
        grid-column: span 3;
    }
    .top-novel.small {
        grid-column: span 2;
    }
    .recommended-novels {
        grid-template-columns: repeat(2, 1fr);
    }
    nav {
        display: none;
    }
}

@media (max-width: 576px) {
    .top-novels {
        grid-template-columns: repeat(2, 1fr);
    }
    .top-novel.first,
    .top-novel:not(.first):not(.small),
    .top-novel.small {
        grid-column: span 2;
    }
    .recommended-novels {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>
