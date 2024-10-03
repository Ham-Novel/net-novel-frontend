<template>
    <article class="comment">
        <section class="detail">
            <h5 class="user-info">
                <p class="nickName">{{ comment.nickName }}</p>
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
            <template v-if="comment.editable">
                <button class="outline edit" @click="toggleModeRecomment(editMode.edit)">
                    <MessageSquareText :size="16" />수정
                </button>
                <button class="outline delete" @click="deleteComment">
                    <MessageSquareX :size="16" />삭제
                </button>
            </template>
            <button
                v-if="featureRecomment"
                class="action-button outline"
                @click="toggleModeRecomment(editMode.recomment)"
            >
                <MessageSquareMore :size="16" />답글
            </button>
            <button class="outline" @click="toggleRecommentList">
                <ChevronDown :size="15" />대댓글
            </button>
        </section>
        <section class="recomment-input" v-if="mode === editMode.recomment">
            <CommentForm
                v-model="recommentContent"
                @submit="createRecomment"
                button-text="대댓글"
            ></CommentForm>
        </section>

        <section class="recomment-list" v-if="isOpenRecomment">
            <template v-for="recomment in comment.reCommentList">
                <RecommentItem
                    :recomment="recomment"
                    :comment-id="comment.commentId"
                    @reload="emits('reload')"
                ></RecommentItem>
            </template>
        </section>

        <section class="top-action">
            <button class="outline" @click="clickLike">
                <ThumbsUp :size="13" /> {{ commentLikes }}
            </button>
            <button class="outline" @click="clickDislike">
                <ThumbsDown :size="13" /> {{ commentDislikes }}
            </button>
            <button class="outline">신고</button>
        </section>
    </article>
</template>

<script setup>
import CommentForm from "./CommentForm.vue";
import RecommentItem from "./RecommentItem.vue";
import {
    ThumbsUp,
    ThumbsDown,
    MessageSquareMore,
    MessageSquareText,
    MessageSquareX,
    ChevronDown,
} from "lucide-vue-next";

import { formatUtil } from "@/hooks/format";
import { commentApi } from "@/hooks/backendApi";
import { computed, ref } from "vue";

const props = defineProps({
    comment: {
        type: Object,
        required: true,
    },
    episodeId: {
        type: Number,
        default: 0,
    },
    featureRecomment: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(["reload"]);

//댓글 생성 날짜 포메팅
const updatedDate = computed(() => {
    return formatUtil.formatRealTime(props.comment?.createdAt);
});

//댓글 좋아요, 싫어요 데이터 변동 실시간 반명
const commentLikes = computed(() => {
    return props.comment.likes + likeDelta.value;
});

const commentDislikes = computed(() => {
    return props.comment.disLikes + dislikeDelta.value;
});

const likeDelta = ref(0);

const dislikeDelta = ref(0);

//좋아요 버튼 클릭 이벤트
async function clickLike() {
    try {
        const result = await likeToComment("LIKE");
        likeDelta.value += result ? 1 : -1;
    } catch (error) {
        console.error("Failed to like to comment");
    }
}

//싫어요 버튼 클릭 이벤트
async function clickDislike() {
    try {
        const result = await likeToComment("DISLIKE");
        dislikeDelta.value += result ? 1 : -1;
    } catch (error) {
        console.error("Failed to dislike to comment");
    }
}

async function likeToComment(type) {
    const result = await commentApi.toggleLike({
        likeType: type,
        commentId: props.comment.commentId,
    });
    return result;
}

//대댓글 접기
const isOpenRecomment = ref(false);
function toggleRecommentList() {
    isOpenRecomment.value = !isOpenRecomment.value;
}

//댓글 컴포넌트 조작 모드
const editMode = Object.freeze({
    none: "none",
    recomment: "recomment",
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

//대댓글 작성 기능
const recommentContent = ref("");

async function createRecomment() {
    try {
        if (recommentContent.value.length > 300) {
            const error = Error("cannot post recomment content longer than 300 characters");
            error.code = "length";
            throw error;
        }

        await commentApi.createRecomment({
            content: recommentContent.value,
            commentId: props.comment.commentId,
        });
        recommentContent.value = "";
        mode.value = editMode.none; //작성 form 닫기
        emits("reload");
    } catch (error) {
        console.error("Failed to create recomment: ", error.message);
        if (error.code === "length") {
            alert("대댓글은 300자로 이하로만 작성 가능합니다.");
        }
    }
}

//댓글 수정 시, 댓글 내용이 변경될 수 있으므로 write 가능
const content = ref(props.comment.content);

//작품 수정
const contentToUpdate = ref(props.comment.content);
async function updateComment() {
    try {
        if (contentToUpdate.value.length > 300) {
            const error = Error("cannot post comment content longer than 300 characters");
            error.code = "length";
            throw error;
        }

        await commentApi.updateComment({
            content: contentToUpdate.value,
            commentId: props.comment.commentId,
            episodeId: props.episodeId,
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
        await commentApi.deleteComment({
            commentId: props.comment.commentId,
            episodeId: props.episodeId,
        });
        emits("reload");
    } catch (error) {
        console.error("Failed to delete comment", error.message);
    }
}
</script>

<style scoped lang="sass">
.comment
    position: relative
    margin: 0
    padding-bottom: 0.5rem
    height: auto
    max-height: max-content

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
        white-space: pre-wrap


section.recomment-input
    margin: 0
    margin-left: 2rem
    margin-bottom: 0.7rem
    margin-top: 1rem


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



.recomment-list
    margin: 0
    margin-left: 2rem
    margin-top: 1rem

    display: flex
    flex-flow: column wrap
    gap: 8px



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
