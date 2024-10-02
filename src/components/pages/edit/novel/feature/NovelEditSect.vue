<template>
    <form class="section-structure" @submit.prevent="submitNovel">
        <section class="cover-form">
            <h3>북커버 표지</h3>
            <CoverUpload
                v-if="formInput.setupImg !== undefined"
                class="cover-img"
                v-model="formInput.imgFile"
                :setup-img="formInput.setupImg"
                :disabled="props.disabled"
            ></CoverUpload>
            <select
                id="cover-copyright-check"
                name="cover-copyright-check"
                value="can-commercial"
                disabled
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
                        v-model="formInput.title"
                        required
                        @keydown.enter.prevent
                        :disabled="props.disabled"
                    />
                </div>
                <TagInput v-model="formInput.tagNames" :disabled="props.disabled"></TagInput>
                <div>
                    <p>작품 소개</p>

                    <TextArea
                        v-model="formInput.description"
                        :disabled="disabled"
                        :aria-invalid="discriptionInvalid"
                    ></TextArea>
                </div>
            </div>
            <div class="novel-nav">
                <input type="submit" value="작품 제출" />
            </div>
        </section>
    </form>
</template>

<script setup>
import CoverUpload from "./CoverUpload.vue";
import TagInput from "./TagInput.vue";
import TextArea from "@/components/reusable/TextArea.vue";

import { onMounted, ref, watch } from "vue";

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
const formInput = defineModel({
    default: {
        title: "", //작품명
        tagNames: [], //태그 이름 리스트
        description: "", //작품 소개
        imgFile: undefined, //이미지 파일
        setupImg: undefined, //이미지 url
        copyright: "", //이미 저작권 상태
    },
});

const titleInvalid = ref(undefined);
const discriptionInvalid = ref(undefined);

watch(
    () => formInput.value.title,
    (value) => {
        if (value.length === 0) {
            titleInvalid.value = undefined;
            return;
        }

        if (value.length < 30) {
            titleInvalid.value = false;
            return;
        }

        titleInvalid.value = true;
    }
);

//form 입력값 제출 메서드
async function submitNovel() {
    if (titleInvalid.value === true) {
        alert("제목은 30자 이상은 불가능합니다.");
        return;
    }
    emits("submit-novel");
}
</script>

<style scoped lang="sass">

article
    position: relative
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

.novel-nav
    position: fixed
    bottom: 0
    left: 0
    padding: 30px
    width: 100%
    background-color: var(--pico-background-color)
    box-shadow: var(--pico-box-shadow)
    border-top: 3px solid var(--pico-muted-border-color)

    input
        margin: 0
</style>
