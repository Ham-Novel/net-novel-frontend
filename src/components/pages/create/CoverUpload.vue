<template>
    <div
        class="uploader"
        :class="{ 'drag-and-drop': isDragging }"
        @click="clickUpload"
        @drop.prevent="handleDrop"
        @dragover.prevent="setDrag(true)"
        @dragleave.prevent="setDrag(false)"
    >
        <div v-if="coverSrc.length == 0" class="preview empty-upload">
            <div><Upload size="50" /></div>
            <p>이미지를 드래그하거나 클릭하여 업로드</p>
            <p>지원 파일 형식: JPG, PNG</p>
        </div>
        <CoverImg v-else class="preview full-upload" :img-url="coverSrc"></CoverImg>
    </div>
    <input type="file" accept="image/*" ref="inputRef" @change.prevent="uploadCover" />
</template>

<script setup>
import CoverImg from "@/components/reusable/CoverImg.vue";
import { Upload } from "lucide-vue-next";
import { ref } from "vue";

const imgFile = defineModel(); //업로드할 이미지 file 변수
const coverSrc = ref("src"); //img 태그에 적용할 src 값
const inputRef = ref(null); // input file DOM 요소

//img 태그 클릭 시 input file 이벤트 실행
function clickUpload() {
    inputRef.value.click();
}

//Drag&Drop 동적 스타일
const isDragging = ref(false);
function setDrag(state) {
    isDragging.value = state;
}

//Drag&Drop 구현
const handleDrop = (event) => {
    const file = event.dataTransfer.files[0];
    console.log("Dropped files:", file);
    saveFile(file);
    displayImg(file);
};

//input file에 change 이벤트 발생 시
function uploadCover(event) {
    const file = event.target.files[0];
    saveFile(file);
    displayImg(file);
}

function saveFile(file) {
    imgFile.value = file;
}

//input file로 저장한 이미지 img 태그에 적용
function displayImg(file) {
    if (file ?? false) {
        //reader 작업 후 결과값 변수에 저장
        const reader = new FileReader();
        reader.onload = (e) => {
            coverSrc.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}
</script>

<style scoped lang="sass">


.uploader
    width: 300px
    height: 400px
    margin-bottom: 10px
    padding: 5px
    border-radius: 10px
    border: 2px dashed var(--line-color)
    overflow: hidden
    cursor: pointer
    transition: all 0.3s


    &:hover
        border: 3px dashed var(--primary-color)
        background-color: var(--bg-sub)

.preview
    width: 100%
    height: 100%


.empty-upload
    display: flex
    flex-flow: column wrap
    justify-content: center
    align-items: center

    div
        flex: 5
        display: flex
        justify-content: center
        align-items: center

    p
        flex: 1

input
    display: none

.drag-and-drop
    border: 3px dashed var(--primary-color)
    background-color: var(--bg-sub)
</style>
