<template>
    <div class="comments-section">
        <div class="sort-options">
            <button
                class="sort-button"
                :class="{ active: sortBy === 'recent' }"
                @click="sortBy = 'recent'"
            >
                최신순
            </button>
            <!-- <button
                class="sort-button"
                :class="{ active: sortBy === '' }"
                @click="sortBy = 'popular'"
            >
                등록순
            </button> -->
            <button
                class="sort-button"
                :class="{ active: sortBy === 'likes' }"
                @click="sortBy = 'likes'"
            >
                추천순
            </button>
        </div>

        <p v-if="comments.length == 0">Comments Loading</p>
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
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import novelAPI from "@/serverApi";
import { ThumbsUp, ThumbsDown } from "lucide-vue-next";

const props = defineProps(["novelId"]);

const comments = ref([]);

const sortBy = ref("recent");

async function loadComments(novelId, sortBy) {
    try {
        const resp = await novelAPI.getCommentsByNovel(novelId, sortBy);
        comments.value.push(...resp);
    } catch (error) {
        console.error("Error in Loading Comments By Novel: ", error);
    }
}

onMounted(() => {
    loadComments(props.novelId, sortBy.value).then(() => {
        console.log(comments.value);
    });
});
</script>

<style scoped>
.comments-section {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding-top: 20px;
    border-top: 2px solid #e0e0e0;
}

.title {
    font-size: 18px;
    margin-bottom: 20px;
}

.sort-options {
}

.sort-button {
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 10px;
}

.sort-button.active {
    font-weight: bold;
    color: #6200ee;
}

.comment {
    border-bottom: 1px solid #e0e0e0;
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
}

.comment-menu-icon {
    margin-left: 5px;
    width: 5px;
    align-self: stretch;
    background-color: #eee;
}

.comment-detail {
    flex: 1;
}

.user-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.nickName {
    font-weight: bold;
    margin-right: 10px;
}

.timestamp {
    color: #757575;
    font-size: 0.8em;
}

.comment-content {
    margin-bottom: 10px;
}

.comment-actions {
    display: flex;
}

.action-button {
    background: none;
    border: none;
    color: #757575;
    cursor: pointer;
    margin-right: 15px;
}
</style>
