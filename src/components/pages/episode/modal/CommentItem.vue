<template>
    <article class="comment">
        <div class="detail">
            <h5 class="user-info">
                <p class="nickName">{{ comment.nickName }}</p>
                <span class="timestamp">{{ updatedDate }}</span>
            </h5>
            <p class="content">{{ comment.content }}</p>
        </div>
        <div class="actions">
            <button class="action-button outline" @click="clickLike">
                <ThumbsUp :size="13" /> {{ commentLikes }}
            </button>
            <!-- <button class="action-button outline" @click="clickDislike">
                <ThumbsDown :size="13" /> {{ commentDislikes }}
            </button> -->
            <button class="action-button outline">신고</button>
        </div>
    </article>
</template>

<script setup>
import { ThumbsUp, ThumbsDown } from "lucide-vue-next";

const props = defineProps({
    comment: {
        type: Object,
        required: true,
    },
});
</script>

<style scoped lang="sass">
.comment
    position: relative
    margin: 0

.detail
    .user-info
        margin-bottom: 0.5rem

        .nickName
            display: inline-block
            font-size: 0.8em
            font-weight: bold
            margin-right: 10px

        .timestamp
            font-size: 0.6em
            font-weight: normal

    //     .avatar
    //         width: 40px
    //         height: 40px
    //         border-radius: 50%
    //         margin-right: 10px

    .content
        width: 90%
        font-size: 0.8rem

.actions
    position: absolute
    top: 15px
    right: 15px
    display: flex
    gap: 0.5rem

    .action-button
        background: none
        border: none
        cursor: pointer
        font-size: 0.8rem

        display: flex
        align-items: center
        gap: 3px
</style>
