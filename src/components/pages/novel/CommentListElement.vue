<template>
    <article class="comment">
        <div class="menu-icon"></div>
        <div class="detail">
            <div class="user-info">
                <span class="nickName">{{ comment.nickName }}</span>
                <span class="timestamp">{{ updatedDate }}</span>
            </div>
            <div class="content">{{ comment.content }}</div>
        </div>
        <div class="actions">
            <button class="action-button"><ThumbsUp :size="13" /> {{ comment.likes }}</button>
            <button class="action-button"><ThumbsDown :size="13" /> {{ comment.disLikes }}</button>
            <button class="action-button">신고</button>
        </div>
    </article>
</template>

<script setup>
import { ThumbsUp, ThumbsDown } from "lucide-vue-next";
import { formatUtil } from "@/hooks/format";
import { computed } from "vue";

const props = defineProps(["comment"]);
const comment = props.comment ?? {
    commentId: 0,
    content: "댓글 내용입니다",
    nickName: "닉네임",
    episodeTitle: "에피소드 제목",
    createdAt: "1010-01-01T11:01:11",
    likes: 10,
    disLikes: 3,
    // recomment
};

const updatedDate = computed(() => {
    return formatUtil.formatRealTime(comment.createdAt);
});
</script>

<style scoped lang="sass">
.comment
    position: relative
    border-bottom: 1px solid var(--bg-dark)
    padding: 15px 0
    display: flex
    flex-direction: row
    align-items: center
    gap: 10px

.menu-icon
    margin-left: 5px
    width: 5px
    align-self: stretch
    background-color: var(--bg-sub)

.detail
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
        color: var(--bg-dark)
        font-size: 0.8em

.content
    margin-bottom: 10px

.actions
    position: absolute
    top: 15px
    right: 15px

    display: flex
    gap: 12px

    .action-button
        background: none
        border: none
        color: var(--text-color)
        cursor: pointer
        font-size: 13px

        display: flex
        align-items: center
        gap: 3px
</style>
