<template>
    <section class="comment-list-section base-wrapper base-distance">
        <section class="list-info">
            <div>
                <p>전체 댓글: 0개</p>
            </div>
            <form class="sort-interface" @submit.prevent>
                <template v-for="option in sortOptions" :key="option.value">
                    <label :for="`${option.sort}-button`">
                        <input
                            type="radio"
                            :id="`${option.sort}-button`"
                            :value="option.sort"
                            name="sortBy"
                            v-model="sortSelected"
                            @change="resetComments"
                        />
                        <span>{{ option.name }}</span>
                    </label>
                </template>
            </form>
        </section>
        <section class="list-view">
            <InfiniteScroll v-bind="scrollProps" ref="scrollRef">
                <template v-slot:default="{ item }">
                    <CommentListElement :comment="item"></CommentListElement>
                </template>
            </InfiniteScroll>
        </section>
    </section>
</template>

<script setup>
import CommentListElement from "./CommentListElement.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";

import { ref, reactive, inject } from "vue";
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
        console.log(sortSelected.value);
        const loadItems = await commentApi.getCommentsByNovel(
            props.novelId,
            sortSelected.value,
            page,
            size
        );
        return loadItems;
    },
    loadingMessage: "Episode Loading...",
});

//댓글 리스트 초기화 메서드
const scrollRef = ref(null);
const resetComments = () => {
    scrollRef.value.reset();
};

//댓글 정렬 방식 설정
const sortOptions = ref([
    { name: "최신순", sort: "recent" },
    { name: "추천순", sort: "likes" },
]);

const sortSelected = ref("recent");
</script>

<style lang="sass" scoped>
@use '@/assets/base.sass'

.comment-list-section
    .list-info
        padding: 10px
        border-bottom: 2px solid
        display: flex
        flex-direction: row
        justify-content: space-between
        font-size: 14px

        .sort-interface
            display: flex
            flex-direction: row
            justify-content: space-between
            gap: 5px

            label
                font-size: inherit
                cursor: pointer

            input
                display: none

                &:checked + span
                    font-weight: bold
                    color: var(--primary-color)
</style>
