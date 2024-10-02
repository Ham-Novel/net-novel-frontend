<template>
    <dialog open @click="exitModal">
        <article class="modal" @click.stop>
            <article>
                <CommentInput @reload="reload"></CommentInput>
            </article>
            <div class="sort-select">
                <label for="sort-likes">
                    <input
                        type="radio"
                        name="sortBy"
                        id="sort-likes"
                        value="likes"
                        v-model="episodeStore.commentSortBy"
                    />
                    추천순
                </label>
                <label for="sort-recent">
                    <input
                        type="radio"
                        name="sortBy"
                        id="sort-recent"
                        value="recent"
                        v-model="episodeStore.commentSortBy"
                    />
                    최신순
                </label>
            </div>
            <div class="comment-list">
                <InfiniteScroll v-bind="scrollProps" ref="scrollRef">
                    <template v-slot:default="{ item }">
                        <CommentItem
                            :comment="item"
                            :episode-id="episodeStore.episodeId"
                            :feature-recomment="true"
                            @reload="reload"
                            v-memo="[item]"
                        ></CommentItem>
                    </template>
                </InfiniteScroll>
            </div>
        </article>
    </dialog>
</template>

<script setup>
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";
import CommentInput from "./CommentInput.vue";
import CommentItem from "@/components/reusable/item/CommentItem.vue";

import { ref, reactive, onMounted, onUnmounted, watch } from "vue";
import { commentApi } from "@/hooks/backendApi";
import { useEpisodePageStore } from "../episodePageStore";

//에피소드 페이지 전역 변수
const episodeStore = useEpisodePageStore();

//modal 바깥을 클릭하면 끄기
function exitModal() {
    episodeStore.currentMenu = null;
}

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
    position: relative
    margin: 0
    margin-bottom: 0.5rem
    max-height: fit-content

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

.sort-select
    margin: 1rem
    font-size: 0.8rem
    font-weight: bold

    display: flex
    justify-content: end
    gap: 10px

    label
        display: flex
        gap: 3px

    input
        margin: 0
</style>
