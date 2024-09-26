<template>
    <form class="section-structure" @submit.prevent="submitNovel">
        <section class="cover-form">
            <h3>북커버 표지</h3>
            <CoverUpload class="cover-img" v-model="novelFormData.imgFile"></CoverUpload>
            <select
                id="cover-copyright-check"
                name="cover-copyright-check"
                v-model="novelFormData.copyright"
                required
                :disabled="props.disabled"
            >
                <option value="" disabled>표지 사용 규정</option>
                <option value="own-copyright">표지 저작권 소유</option>
                <option value="can-commercial">표지 상업적 이용 가능</option>
            </select>
        </section>
        <section class="info-form">
            <h3>작품 상세</h3>
            <div class="novel-info">
                <div>
                    <p>작품명</p>
                    <input
                        type="text"
                        v-model="novelFormData.title"
                        required
                        @keydown.enter.prevent
                        :disabled="props.disabled"
                    />
                </div>
                <TagInput v-model="novelFormData.tagNames" :disabled="props.disabled"></TagInput>
                <div>
                    <p>작품 소개</p>
                    <textarea
                        name="description"
                        v-model="novelFormData.description"
                        @keydown.enter.prevent
                        required
                        :disabled="props.disabled"
                    ></textarea>
                </div>
            </div>
            <input type="submit" value="확인" />
        </section>
    </form>
</template>

<script setup>
import { computed, onMounted } from "vue";
import CoverUpload from "./CoverUpload.vue";
import TagInput from "./TagInput.vue";

import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
    //true이면 모든 input을 read only 설정
    disabled: {
        type: Boolean,
        default: false,
    },
});
const emits = defineEmits(["submit-novel"]); //부모로부터 받은 제출 로직

//작품 정보 입력 데이터
const novelFormData = defineModel({
    default: {
        title: "", //작품명
        tagNames: [], //태그 이름 리스트
        description: "", //작품 소개
        imgFile: null, //이미지 파일
        copyright: "", //이미 저작권 상태
    },
});

//v-model에 copyright default 값 설정하기
onMounted(() => {
    if (novelFormData.value.copyright ?? false) {
        return;
    }
    const data = novelFormData.value;
    data.copyright = "";
    emits("update:modelValue", data);
});

//form 입력값 제출 메서드
async function submitNovel() {
    emits("submit-novel");
}
</script>

<style scoped lang="sass">

article
    // position: relative
    width: 800px
    margin: 0

.section-structure
    display: flex
    flex-flow: row nowrap
    gap: 30px

section
    margin: 0
    padding: 0
    min-width: 300px

select
    height: 60px

input[type=text]
    height: 60px

input[type=submit]
    position: relative
    float: right

    width: fit-content
    padding: 10px 20px
    margin: 0

textarea
    min-height: 300px
    height: fit-content
    resize: none
    overflow: hidden

.cover-form
    .cover-img
        width: 200px

.info-form
    flex-grow: 1
</style>
