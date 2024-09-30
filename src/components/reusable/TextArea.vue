<template>
    <textarea v-model="text" ref="textRef"></textarea>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

//textarea 댓글 내용
const text = defineModel();

//textarea 높이 에피소드 내용에 맞게 조절
const textRef = ref(null);
function resizeTextarea() {
    const textarea = textRef.value;
    textarea.style.height = "auto"; // 높이를 초기화
    textarea.style.height = textarea.scrollHeight + "px"; // scrollHeight에 맞게 높이 조정
}
//text 값이 변경될 때마다 이벤트 발생
watch(text, (value) => {
    resizeTextarea();
});
//content 초기값 설정 시 텍스트 크기 조정
onMounted(() => {
    resizeTextarea();
});
</script>

<style scoped lang="sass">
textarea
    resize: none
    overflow: hidden
</style>
