<template>
    <section class="comment-list-figure base-wrapper base-distance">
        <div class="comment-list-info">
            <div>
                <p>전체 댓글: 0화</p>
            </div>
            <form
                class="comment-list-sort"
                @submit.prevent="resortComments"
                ref="formRef"
            >
                <div class="sort-radio">
                    <input
                        type="radio"
                        id="recent-button"
                        value="recent"
                        name="sortComments"
                        v-model="sortBy"
                        @change="resortComments"
                    />
                    <label for="recent-button">최신순</label>
                </div>
                <div class="sort-radio">
                    <input
                        type="radio"
                        id="likes-button"
                        value="likes"
                        name="sortComments"
                        v-model="sortBy"
                        @change="resortComments"
                    />
                    <label for="likes-button">추천순</label>
                </div>
            </form>
        </div>
        <InfiniteScroll
            :page-size="10"
            :load-items-method="loadComments"
            v-slot:default="slotProps"
        >
            <template v-for="item in slotProps.itemList">
                <CommentListElement :comment="item"></CommentListElement>
            </template>
        </InfiniteScroll>
    </section>
</template>

<script setup>
import CommentListElement from "./CommentListElement.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";
import { ref, onMounted, computed } from "vue";
import novelAPI from "@/serverApi";

const props = defineProps(["novelId"]);

const comments = ref([]);

const sortBy = ref("recent");

//댓글 정렬 변경 Backend Api 통신
const resortComments = () => {
    loadComments(props.novelId, 0, 3).then((resp) => {
        comments.value = resp;
    });
};

//댓글 Backend Api 통신
const loadComments = async (pageNumber, pageSize) => {
    try {
        const resp = await novelAPI.getCommentsByNovel(
            props.novelId,
            sortBy.value,
            pageNumber,
            pageSize
        );
        return Array.from(resp);
    } catch (error) {
        console.error("Error in Loading Comments By Novel: ", error);
    }
};

onMounted(() => {
    resortComments();
    // console.log(sortBy.value);
});
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
