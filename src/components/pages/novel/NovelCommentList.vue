<template>
    <section class="comment-list-figure base-wrapper base-distance">
        <div class="comment-list-info">
            <div>
                <p>전체 댓글: 0개</p>
            </div>
            <form class="comment-list-sort" @submit.prevent="resortComments">
                <div class="sort-radio" v-for="sortItem in sortByList">
                    <input
                        type="radio"
                        :id="sortItem.name + '-button'"
                        :value="sortItem.name"
                        name="sortComments"
                        v-model="sortBy"
                        @click="resortScroll"
                    />
                    <label :for="sortItem.name + '-button'">{{
                        sortItem.displayName
                    }}</label>
                </div>
            </form>
        </div>
        <InfiniteScroll :load-method="loadComments" @add-items="addComments">
            <template v-for="comment in comments">
                <CommentListElement :comment="comment"></CommentListElement>
            </template>
        </InfiniteScroll>
    </section>
</template>

<script setup>
import CommentListElement from "./CommentListElement.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";
import { ref, onMounted, computed, reactive } from "vue";
import novelAPI from "@/serverApi";

const props = defineProps(["novelId"]); //novel id를 외부 컴포넌트에서 받기
const pageNubmer = ref(0);
const pageSize = ref(30); //Scroll 이벤트를 발동할 때마다 가져올 댓글 수

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

//댓글 데이터 저장소 배열
const comments = reactive([]);

//댓글 배열에 새 댓글을 추가하는 메서드
const addComments = (newItems) => {
    console.log(newItems);
    comments.push(...newItems);
};

//댓글 Backend와 Api 통신하여 댓글 데이터를 가져오는 메서드
//InfiniteScroll 컴포넌트에서 사용하게끔 props 파라미터로 전달
const loadComments = async () => {
    try {
        const resp = await novelAPI.getCommentsByNovel(
            props.novelId,
            sortBy.value,
            pageNubmer.value++,
            pageSize.value
        );
        return Array.from(resp);
    } catch (error) {
        console.error("Error in Loading Comments By Novel: ", error);
    }
};

//스크롤 컴포넌트 초기화 메서드
// InfiniteScroll 컴포넌트로부터 메서드 받음
const scrollRef = ref(null);
const resortScroll = () => {
    pageNubmer.value = 0;
    comments.splice(0, comments.length);
};
</script>

<style lang="sass" scoped>
@use '@/assets/base.sass'

.comment-list-info
    padding: 10px
    border-bottom: 2px solid #e0e0e0
    display: flex
    flex-direction: row
    justify-content: space-between
    font-size: 14px

.comment-list-sort
    display: flex
    flex-direction: row
    justify-content: space-between
    gap: 5px

    label
        cursor: pointer

.sort-radio
    font-size: inherit

    input
        display: none

    .active
        font-weight: bold
        color: #6200ee

.comment-list-loading
    display: flex
    justify-content: center
    align-items: center
    height: 100px
</style>
