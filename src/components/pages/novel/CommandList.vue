<template>
    <section class="comment-list-section base-wrapper base-distance">
        <section class="list-info">
            <div></div>
            <div class="sort">
                <label for="recent">
                    <input
                        type="radio"
                        name="comment-sort"
                        id="recent"
                        value="recent"
                        v-model="sort"
                    />
                    최신순
                </label>
                <label for="likes">
                    <input
                        type="radio"
                        name="comment-sort"
                        id="likes"
                        value="likes"
                        v-model="sort"
                    />
                    추천순
                </label>
            </div>
        </section>
        <section class="list-view">
            <InfiniteScroll v-bind="scrollProps" ref="scrollRef">
                <template v-slot:default="{ item }">
                    <CommentItem
                        :comment="item"
                        :comment-id="item.commentId"
                        :episode-id="item.episodeId"
                        :options="{
                            like: true,
                            edit: true,
                            recomment: false,
                            type: false,
                        }"
                        @reload="reload"
                    ></CommentItem>
                </template>
            </InfiniteScroll>
        </section>
    </section>
</template>

<script setup>
import CommentItem from "@/components/reusable/comment/CommentItemV2.vue";
// import CommentItem from "@/components/reusable/comment/CommentItem.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";

import { ref, reactive, inject, watch } from "vue";
import { commentApi } from "@/hooks/backendApi";

//novel id 값
const props = defineProps({
    novelId: {
        type: Number,
        required: true,
    },
});

//InfiniteScroll props 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 30 },
    loadMethod: async (page, size) => {
        const loadItems = await commentApi.getCommentsByNovel(
            props.novelId,
            sort.value,
            page,
            size
        );
        return loadItems;
    },
});

//댓글 리스트 재렌더링
const scrollRef = ref(null);
const reload = () => {
    scrollRef.value.reset();
};

//댓글 정렬 방식 설정
const sort = ref("recent");

//댓글 정렬 바꿀 때마다 댓글 목록 재렌더링
watch(sort, () => {
    reload();
});
</script>

<style lang="sass" scoped>

.comment-list-section
    width: 700px

.list-info
    padding: 10px
    border-bottom: 2px solid
    display: flex
    flex-direction: row
    justify-content: space-between
    font-size: 14px

    .sort
        display: flex
        flex-flow: row wrap
        justify-content: end
        gap: 0.5rem

        label
            margin: 0
            display: flex
            align-items: center
            gap: 0.2rem

        input
            width: 20px
            height: 20px
            margin: 0

.list-view
    display: flex
    flex-flow: column
    gap: 15px
</style>
