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
const props = defineProps(["comment"]);
const comment = props.comment;
</script>
