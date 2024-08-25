<template>
    <section class="comment-list-section base-wrapper base-distance">
        <div class="list-info">
            <div>
                <p>전체 댓글: 0개</p>
            </div>
            <form class="sort-interface" @submit.prevent="resortComments">
                <template v-for="sortItem in sortByList">
                    <label :for="sortItem.name + '-button'">
                        <input
                            type="radio"
                            :id="sortItem.name + '-button'"
                            :value="sortItem.name"
                            name="sortComments"
                            v-model="sortBy"
                            @click="resetComments"
                        />
                        <span>{{ sortItem.displayName }}</span>
                    </label>
                </template>
            </form>
        </div>
        <InfiniteScroll
            class="list-view"
            :load-method="loadComments"
            :page-props="pageProps"
            loading-message="Comments Loading..."
            ref="scrollRef"
        >
            <template v-slot:default="slotProps">
                <CommentListElement
                    :comment="slotProps.item"
                ></CommentListElement>
            </template>
        </InfiniteScroll>
    </section>
</template>

<script setup>
import CommentListElement from "./CommentListElement.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";

import { ref, reactive } from "vue";
import { commentApi } from "@/backendApi";

//작품 id 외부 컴포넌트에서 받기
const props = defineProps(["novelId"]);

//스크롤 페이지 로드 설정 변수
const pageProps = ref({ number: 0, size: 30 });

//댓글 정렬 방식 Enum
const sortByList = reactive({
    recent: {
        name: "recent",
        displayName: "최신순",
    },
    likes: {
        name: "likes",
        displayName: "추천순",
    },
});
const sortBy = ref(sortByList.recent.name); //현재 정렬 변수

//댓글 리스트 초기화 메서드 가져오기
const scrollRef = ref(null);
const resetComments = () => {
    scrollRef.value.resetItem();
};

//댓글 Backend와 Api 통신하여 댓글 데이터를 가져오는 메서드
const loadComments = async (page, size) => {
    const loadItems = await commentApi.getCommentsByNovel(
        props.novelId,
        sortBy.value,
        page,
        size
    );
    return loadItems;
};
</script>

<style lang="sass" scoped>
@use '@/assets/base.sass'

.comment-list-section
    .list-info
        padding: 10px
        border-bottom: 2px solid #e0e0e0
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
                color: #7048fe
</style>
