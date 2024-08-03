<template>
    <div class="infinite-scroll-container">
        <template v-for="item in items">
            <!-- <slot name="element" :item="item"></slot> -->
            <EpiListElement :episode="item"></EpiListElement>
        </template>
        <div v-if="loading" class="infinite-scroll-loading">
            <!-- <p>{{ props.loadingMessage }}</p> -->
            <p>loading...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import EpiListElement from "../pages/novel/EpiListElement.vue";

const props = defineProps(["loadingMessage"]);

//변수 설정
const items = ref([]);
const page = ref(1);
const loading = ref(false); //loadItems 실행중
const allLoaded = ref(false); //더이상 불러올 items 없음

//API에서 새 아이템 불러오는 메서드
const loadItems = async () => {
    if (loading.value || allLoaded.value) return;

    loading.value = true;

    // 새 아이템을 생성하는 함수
    const generateItems = (page, perPage = 10) => {
        return Array.from({ length: perPage }, (_, index) => ({
            episodeId: (page - 1) * perPage + index + 1,
            chapter: (page - 1) * perPage + index + 1,
            title: `title 입니다`,
            content: `This is the content in page ${page}.`,
            views: 1000,
            letterCount: 3000,
            commentCount: 10,
            uploadDate: "2024-05-05T16:03:32",
        }));
    };

    // 비동기 동작을 시뮬레이션하기 위해 setTimeout 사용
    setTimeout(() => {
        const newItems = generateItems(page.value);
        if (newItems.length === 0) {
            allLoaded.value = true;
        } else {
            items.value = [...items.value, ...newItems];
            page.value++;
        }
        loading.value = false;
    }, 1000); // 1초 지연
};

//페이지 최하단 도달하는 스크롤 이벤트 감지
const handleScroll = () => {
    const bottomOfWindow =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;

    if (bottomOfWindow) {
        loadItems(); //이벤트 발동 시 실행하는 메서드
    }
};

onMounted(() => {
    loadItems();
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="sass" scoped>
.infinite-scroll-loading
    display: flex
    justify-content: center
    align-items: center
    height: 100px
</style>
