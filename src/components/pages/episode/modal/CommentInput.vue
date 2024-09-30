<template>
    <article>
        <form class="form" @submit.prevent="submitComment">
            <textarea class="content" v-model="content" ref="contentRef"></textarea>
            <input type="submit" class="submit" value="댓글 작성" />
        </form>
    </article>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { commentApi, episodeApi } from "@/hooks/backendApi";
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

//textarea 높이 에피소드 내용에 맞게 조절
const contentRef = ref(null);
function resizeTextarea() {
    const textarea = contentRef.value;
    textarea.style.height = "auto"; // 높이를 초기화
    textarea.style.height = textarea.scrollHeight + "px"; // scrollHeight에 맞게 높이 조정
}
//content 값이 변경될 때마다 이벤트 발생
watch(content, (value) => {
    resizeTextarea();
});
//content 초기값 설정 시 텍스트 크기 조정
onMounted(() => {
    resizeTextarea();
});
</script>

<style scoped lang="sass">
article
    position: relative
    margin: 0
    margin-bottom: 0.5rem

.header
    display: inline-block
    font-size: 0.9em
    font-weight: bold
    margin-right: 10px
    margin-bottom: 0.5rem

.content
    font-size: 0.8rem
    resize: none
    overflow: hidden

form
    height: fit-content

    textarea
        margin-bottom: 1px
        border-bottom-left-radius: 0
        border-bottom-right-radius: 0

    input
        border-top-left-radius: 0
        border-top-right-radius: 0
</style>
