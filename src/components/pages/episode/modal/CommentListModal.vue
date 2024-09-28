<template>
    <dialog open class="list-view">
        <article>
            <h1>댓글</h1>
            <p>댓글</p>
            <p>댓글</p>
        </article>
        <!-- <InfiniteScroll v-bind="scrollProps" ref="scrollRef">
            <template v-slot:default="{ item }">
                <CommentListElement :comment="item"></CommentListElement>
            </template>
        </InfiniteScroll> -->
    </dialog>
</template>

<script setup>
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { commentApi } from "@/hooks/backendApi";
import { useEpisodePageStore } from "../episodePageStore";

//에피소드 페이지 전역 변수
const episodeStore = useEpisodePageStore();

//InfiniteScroll props 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 10 },
    loadMethod: async (page, size) => {
        console.log(sortSelected.value);
        const loadItems = await commentApi.getCommentsByEpisode(
            episodeStore.episodeId,
            "recent",
            page,
            size
        );
        return loadItems;
    },
    loadingMessage: "Episode Loading...",
});

//댓글 리스트 초기화 메서드
const scrollRef = ref(null);
const reload = () => {
    scrollRef.value.reset();
};

//에피소드 페이지 스크롤 정지
onMounted(() => {
    document.body.style.overflow = "hidden";
});
onUnmounted(() => {
    document.body.style.overflow = "";
});
</script>

<style lang="sass" scoped>
article
    max-height: 90%
    overflow-y: scroll
</style>
