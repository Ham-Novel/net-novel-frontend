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
import { formatUtil } from "@/hooks/format";
import { commentApi } from "@/hooks/backendApi";
import { computed, ref } from "vue";

const props = defineProps({
    comment: {
        type: Object,
        required: true,
    },
});

//댓글 생성 날짜 포메팅
const updatedDate = computed(() => {
    return formatUtil.formatRealTime(props.comment?.createdAt);
});

//댓글 좋아요, 싫어요 데이터 변동 실시간 반명
const commentLikes = computed(() => {
    return props.comment.likes + likeDelta.value;
});

// const commentDislikes = computed(() => {
//     return props.comment.disLikes + dislikeDelta.value;
// });

const likeDelta = ref(0);

// const dislikeDelta = ref(0);

//좋아요 버튼 클릭 이벤트
async function clickLike() {
    const data = await commentApi.toggleLike({
        likeType: "LIKE",
        commentId: props.comment.commentId,
    });

    if (data === "좋아요 등록 완료") {
        likeDelta.value++;
        console.log("+");
    } else {
        likeDelta.value--;
        console.log("-");
    }
}

// //싫어요 버튼 클릭 이벤트
// async function clickDislike() {
//     const data = await commentApi.toggleLike({
//         likeType: "DISLIKE",
//         commentId: props.comment.commentId,
//     });
//     if (data === "좋아요 등록 완료") {
//         dislikeDelta.value++;
//         console.log("+");
//     } else {
//         dislikeDelta.value--;
//         console.log("-");
//     }
// }
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
