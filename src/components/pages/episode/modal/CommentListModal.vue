<template>
    <dialog open>
        <article class="modal">
            <CommentInput @reload="reload"></CommentInput>
            <select class="sort-by" v-model="episodeStore.commentSortBy">
                <option value="recent">최신순</option>
                <option value="likes">추천순</option>
            </select>
            <div class="comment-list">
                <InfiniteScroll v-bind="scrollProps" ref="scrollRef">
                    <template v-slot:default="{ item }">
                        <CommentItem :comment="item"></CommentItem>
                    </template>
                </InfiniteScroll>
            </div>
        </article>
    </dialog>
</template>

<script setup>
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";
import CommentItem from "@/components/reusable/item/CommentItem.vue";
import CommentInput from "./CommentInput.vue";

import { ref, reactive, onMounted, onUnmounted, watch } from "vue";
import { commentApi } from "@/hooks/backendApi";
import { useEpisodePageStore } from "../episodePageStore";

//에피소드 페이지 전역 변수
const episodeStore = useEpisodePageStore();

//정렬 변경시 댓글 재렌더링
watch(
    () => episodeStore.commentSortBy,
    () => {
        reload();
    }
);

//InfiniteScroll props 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 10 },
    loadMethod: async (page, size) => {
        const loadItems = await commentApi.getCommentsByEpisode(
            episodeStore.episodeId,
            episodeStore.commentSortBy,
            page,
            size
        );
        console.log(loadItems);
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
article.modal
    max-height: 90%
    min-height: 50%
    width: 900px
    overflow-y: scroll
    overflow-x: none

.comment-list
    display: flex
    flex-flow: column wrap
    gap: 10px
</style>
