<template>
    <div class="comment">
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
</template>

<script setup>
import { ThumbsUp, ThumbsDown } from "lucide-vue-next";

const props = defineProps(["comment"]);
const comment = props.comment ?? {
    commentId: 0,
    content: "댓글 내용입니다",
    nickName: "닉네임",
    episodeTitle: "에피소드 제목",
    createAt: "1010-01-01T11:01:11",
    likes: 10,
    disLikes: 3,
    // recomment
};
</script>

<style scoped lang="sass">
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
