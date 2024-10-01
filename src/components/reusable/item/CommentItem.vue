<template>
    <article class="comment">
        <section class="detail">
            <h5 class="user-info">
                <p class="nickName">{{ comment.nickName }}</p>
                <span class="timestamp">{{ updatedDate }}</span>
            </h5>
            <p class="content">{{ comment.content }}</p>
        </section>
        <section class="recomment-action">
            <button
                v-if="featureRecomment"
                class="action-button outline"
                @click="toggleRecommentForm"
            >
                <MessageSquareMore :size="16" />답글
            </button>
            <button class="outline" @click="toggleRecommentList">
                <ChevronDown :size="15" />대댓글
            </button>
        </section>
        <section class="recomment-input" v-if="isOpenForm">
            <form @submit.prevent="createRecomment" role="group">
                <TextArea v-model="recommentContent"></TextArea>
                <input type="submit" class="submit" value="댓글 작성" />
            </form>
        </section>
        <section class="recomment-list" v-if="isOpenRecomment">
            <template v-for="recomment in comment.reCommentList" :key="recomment.reCommentId">
                <RecommentItem :recomment="recomment"></RecommentItem>
            </template>
        </section>
        <section class="actions">
            <button class="action-button outline" @click="clickLike">
                <ThumbsUp :size="13" /> {{ commentLikes }}
            </button>
            <button class="action-button outline" @click="clickDislike">
                <ThumbsDown :size="13" /> {{ commentDislikes }}
            </button>
            <button class="action-button outline">신고</button>
        </section>
    </article>
</template>

<script setup>
import RecommentItem from "./RecommentItem.vue";
import TextArea from "../TextArea.vue";
import { ThumbsUp, ThumbsDown, MessageSquareMore, ChevronDown } from "lucide-vue-next";

import { formatUtil } from "@/hooks/format";
import { commentApi } from "@/hooks/backendApi";
import { computed, ref } from "vue";

const props = defineProps({
    comment: {
        type: Object,
        required: true,
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
    await likeToComment("LIKE");
}

//싫어요 버튼 클릭 이벤트
async function clickDislike() {
    await likeToComment("DISLIKE");
}

async function likeToComment(type) {
    const data = await commentApi.toggleLike(
        {
            likeType: type,
            commentId: props.comment.commentId,
        },
        erorHandler
    );
    console.log(data);
}

const erorHandler = {
    400: (error) => {
        alert("이미 댓글에 반응하셨습니다.");
    },
};

//대댓글 접기
const isOpenRecomment = ref(false);
function toggleRecommentList() {
    isOpenRecomment.value = !isOpenRecomment.value;
}

//대댓글 작성 textarea 열기
const isOpenForm = ref(false);
function toggleRecommentForm() {
    isOpenForm.value = !isOpenForm.value;
}

//대댓글 작성 기능
const recommentContent = ref("");

async function createRecomment() {
    try {
        await commentApi.createRecomment({
            content: recommentContent.value,
            commentId: props.comment.commentId,
        });
        recommentContent.value = "";
        isOpenForm.value = false; //대댓글 작성 form 닫기
        emits("reload");
    } catch (error) {
        alert("대댓글 작성에 오류가 발생하였습니다. 다시 시도하여 주십시오.");
    }
}
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

    .content
        width: 90%
        font-size: 0.8rem


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



.recomment-list
    margin: 0
    margin-left: 2rem
    margin-top: 1rem

    display: flex
    flex-flow: column wrap
    gap: 8px

.recomment-action
    position: relative
    margin: 0

    display: flex
    justify-content: end
    gap: 0.5rem

    button
        background: none
        border: none
        cursor: pointer
        font-size: 0.8rem

        display: flex
        align-items: center
        gap: 3px
</style>
