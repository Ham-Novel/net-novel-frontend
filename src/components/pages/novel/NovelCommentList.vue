<template>
    <section class="comment-list-figure base-wrapper base-distance">
        <div class="comment-list-info">
            <div>
                <p>전체 댓글: {{ comments.length }}</p>
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

        <p v-if="comments.length == 0" class="comment-list-loading">
            Comments Loading
        </p>
        <div
            class="comment"
            v-else
            v-for="comment in comments"
            :key="comment.commentId"
        >
            <div class="comment-menu-icon"></div>
            <div class="comment-detail">
                <div class="user-info">
                    <span class="nickName">{{ comment.nickName }}</span>
                    <span class="timestamp">1시간 전</span>
                </div>
                <div class="comment-content">{{ comment.content }}</div>
                <div class="comment-actions">
                    <button class="action-button">
                        <ThumbsUp :size="15" /> {{ comment.likes }}
                    </button>
                    <button class="action-button">
                        <ThumbsDown :size="15" /> {{ comment.dislikes }}
                    </button>
                    <button class="action-button">신고</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import novelAPI from "@/serverApi";
import { ThumbsUp, ThumbsDown } from "lucide-vue-next";

const props = defineProps(["novelId"]);

const comments = ref([]);

const sortBy = ref("recent");

//댓글 정렬 변경 Backend Api 통신
const resortComments = () => {
    loadComments(props.novelId, sortBy.value).then((resp) => {
        comments.value = resp;
    });
};

//댓글 Backend Api 통신
const loadComments = async (novelId, sortBy) => {
    try {
        const resp = await novelAPI.getCommentsByNovel(novelId, sortBy);
        return Array.from(resp);
    } catch (error) {
        console.error("Error in Loading Comments By Novel: ", error);
    }
};

onMounted(() => {
    loadComments(props.novelId, sortBy.value).then((resp) => {
        comments.value.push(...resp);
    });
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

    //Todo 코멘트 컴포넌트화 시키기
.comment
    border-bottom: 1px solid #e0e0e0
    padding: 15px 0
    display: flex
    flex-direction: row
    align-items: center
    gap: 8px

.comment-menu-icon
    margin-left: 5px
    width: 5px
    align-self: stretch
    background-color: #eee

.comment-detail
    flex: 1

.user-info
    display: flex
    align-items: center
    margin-bottom: 10px

    .avatar
        width: 40px
        height: 40px
        border-radius: 50%
        margin-right: 10px

    .nickName
        font-weight: bold
        margin-right: 10px

    .timestamp
        color: #757575
        font-size: 0.8em

.comment-content
    margin-bottom: 10px

.comment-actions
    display: flex

    .action-button
        background: none
        border: none
        color: #757575
        cursor: pointer
        margin-right: 15px
</style>
