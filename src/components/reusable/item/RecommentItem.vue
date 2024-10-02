<template>
    <article class="recomment">
        <section class="detail">
            <h5 class="user-info">
                <p class="nickName">{{ recomment.nickName }}</p>
                <span class="timestamp">{{ updatedDate }}</span>
            </h5>
            <CommentForm
                v-if="mode === editMode.edit"
                v-model="contentToUpdate"
                @submit="updateComment"
                button-text="수정"
            ></CommentForm>
            <p v-else class="content">{{ content }}</p>
        </section>
        <section class="bottom-action">
            <button class="outline edit" @click="toggleModeRecomment(editMode.edit)">
                <MessageSquareText :size="16" />수정
            </button>
            <button class="outline delete" @click="deleteComment">
                <MessageSquareX :size="16" />삭제
            </button>
        </section>
        <section class="top-action">
            <button class="outline" @click="clickLike">
                <ThumbsUp :size="13" /> {{ recommentLikes }}
            </button>
            <button class="outline" @click="clickDislike">
                <ThumbsDown :size="13" /> {{ recommentDislikes }}
            </button>
            <button class="outline">신고</button>
        </section>
    </article>
</template>

<script setup>
import CommentForm from "./CommentForm.vue";
import { ThumbsUp, ThumbsDown, MessageSquareText, MessageSquareX } from "lucide-vue-next";

import { formatUtil } from "@/hooks/format";
import { commentApi } from "@/hooks/backendApi";
import { computed, ref } from "vue";

const props = defineProps({
    recomment: {
        type: Object,
        required: true,
    },
    commentId: {
        type: Number,
        required: true,
    },
});

const emits = defineEmits(["reload"]);

//댓글 생성 날짜 포메팅
const updatedDate = computed(() => {
    return formatUtil.formatRealTime(props.recomment?.createdAt);
});

//댓글 좋아요, 싫어요 데이터 변동 실시간 반명
const recommentLikes = computed(() => {
    return props.recomment.likes + likeDelta.value;
});

const recommentDislikes = computed(() => {
    return props.recomment.disLikes + dislikeDelta.value;
});

const likeDelta = ref(0);

const dislikeDelta = ref(0);

//좋아요 버튼 클릭 이벤트
async function clickLike() {
    try {
        const result = await likeToRecomment("LIKE");
        likeDelta.value += result ? 1 : -1;
    } catch (error) {
        console.error("Failed to like to recomment");
    }
}

//싫어요 버튼 클릭 이벤트
async function clickDislike() {
    try {
        const result = await likeToRecomment("DISLIKE");
        dislikeDelta.value += result ? 1 : -1;
    } catch (error) {
        console.error("Failed to dislike to recomment");
    }
}

async function likeToRecomment(type) {
    const result = await commentApi.toggleLikeRecomment({
        likeType: type,
        reCommentId: props.recomment.reCommentId,
    });
    return result;
}

//대댓글 컴포넌트 조작 모드
const editMode = Object.freeze({
    none: "none",
    edit: "edit",
});

const mode = ref(editMode.none);
function toggleModeRecomment(targetMode) {
    if (mode.value === targetMode) {
        mode.value = editMode.none;
    } else {
        mode.value = targetMode;
    }
}

//댓글 수정 시, 댓글 내용이 변경될 수 있으므로 write 가능
const content = ref(props.recomment.content);

//작품 수정
const contentToUpdate = ref(props.recomment.content);
async function updateComment() {
    try {
        if (contentToUpdate.value.length > 300) {
            const error = Error("cannot post comment content longer than 300 characters");
            error.code = "length";
            throw error;
        }

        await commentApi.updateRecomment({
            content: contentToUpdate.value,
            reCommentId: props.recomment.reCommentId,
            commentid: props.commentId,
        });
        content.value = contentToUpdate.value; //변경된 댓글 내용 적용
        mode.value = editMode.none; //작성 form 닫기
    } catch (error) {
        console.error("Failed to update comment: ", error.message);

        if (error.code === "length") {
            alert("댓글은 300자로 이하로만 작성 가능합니다.");
        }
    }
}

//작품 삭제
async function deleteComment() {
    const result = confirm("정말로 삭제하시겠습니까?");
    if (!result) {
        return;
    }

    try {
        await commentApi.deleteRecomment({
            reCommentId: props.recomment.reCommentId,
            commentid: props.commentId,
        });
        emits("reload");
    } catch (error) {
        console.error("Failed to delete comment", error.message);
    }
}
</script>

<style scoped lang="sass">
.recomment
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

    .content
        width: 90%
        font-size: 0.8rem


section.recomment-input
    margin: 0
    margin-left: 2rem


    form
        position: relative
        margin: 0

        display: flex
        align-items: stretch

        textarea
            font-size: 0.8rem

        input
            height: auto
            padding: 0 1rem
            font-size: 0.8rem
            display: flex
            align-items: center

.top-action
    position: absolute
    top: 15px
    right: 15px
    display: flex

    button
        background: none
        border: none
        cursor: pointer
        font-size: 0.8rem

        display: flex
        align-items: center
        gap: 3px

.bottom-action
    position: relative
    margin: 0

    display: flex
    justify-content: end

    button
        background: none
        border: none
        cursor: pointer
        font-size: 0.7rem

        display: flex
        align-items: center
        gap: 3px

    button.edit
        color: green

    button.delete
        color: red
</style>
