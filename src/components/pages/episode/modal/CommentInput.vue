<template>
    <!-- <form class="form" @submit.prevent="submitComment">
        <TextArea v-model="content"></TextArea>
        <input type="submit" class="submit" value="댓글 작성" />
    </form> -->
    <CommentForm
        class="form"
        v-model="content"
        @submit="submitComment"
        button-text="댓글 작성"
    ></CommentForm>
</template>

<script setup>
import CommentForm from "@/components/reusable/item/CommentForm.vue";

import { onMounted, ref, watch } from "vue";
import { commentApi } from "@/hooks/backendApi";
import { useEpisodePageStore } from "../episodePageStore";

//에피소드 페이지 전역 변수
const episodeStore = useEpisodePageStore();

const emits = defineEmits(["reload"]);

//댓글 작성
async function submitComment() {
    try {
        await commentApi.createComment({
            content: content.value,
            episodeId: episodeStore.episodeId,
        });
        emits("reload");
        content.value = "";
    } catch (error) {
        alert("댓글 작성에 오류가 발생하였습니다. 다시 시도해주십시오.");
    }
}

//textarea 댓글 내용
const content = ref("");
</script>

<style scoped lang="sass">

.header
    display: inline-block
    font-size: 0.9em
    font-weight: bold
    margin-right: 10px
    margin-bottom: 0.5rem


.form
    min-height: 100px
</style>
