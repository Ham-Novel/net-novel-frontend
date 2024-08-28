<template>
    <article class="novel-create-page">
        <form @submit.prevent class="create-form base-wrapper">
            <section class="cover-form">
                <h3>북커버 표지</h3>
                <div class="cover-input" @click="coverUpload">
                    <img :src="coverSrc" alt="썸네일 이미지" />
                </div>
                <input
                    type="file"
                    accept="image/*"
                    ref="imgInputRef"
                    @change="applyUpload"
                />
                <div class="cover-copyright">
                    <label for="cover-copyright-check">
                        표지 사용 규정 :
                    </label>
                    <select
                        id="cover-copyright-check"
                        name="cover-copyright-check"
                        v-model="copyrightCheck"
                    >
                        <option value="non-select">선택해주세요</option>
                        <option value="own-copyright">표지 저작권 소유</option>
                        <option value="can-use-commercial">
                            표지 상업적 이용 가능
                        </option>
                    </select>
                </div>
            </section>
            <section class="info-form">
                <div>
                    <p>작품명</p>
                    <input type="text" />
                </div>
                <div>
                    <p>작품 소개</p>
                    <textarea name="desc"></textarea>
                </div>
                <div>
                    <p>해시 태그</p>
                    <input type="text" />
                </div>
                <div>
                    <p>독점작 여부</p>
                    <input type="radio" />
                    <input type="radio" />
                    <input type="radio" />
                </div>
                <div>
                    <p>연재 요일</p>
                    <input type="radio" />
                    <input type="radio" />
                    <input type="radio" />
                </div>
            </section>
            <button class="create-button">작품 등록</button>
        </form>
    </article>
</template>

<script setup>
import { ref } from "vue";

const imgInputRef = ref(null); // input file DOM 요소
const coverSrc = ref(""); //img 태그 src 값

//img 태그 클릭 시 input file 이벤트 실행
function coverUpload() {
    imgInputRef.value.click();
}

//input file로 저장한 이미지 img 태그에 적용
function applyUpload(event) {
    const file = event.target.files[0];
    if (file ?? false) {
        const reader = new FileReader();
        //reader 작업 후 결과값 변수에 저장
        reader.onload = (e) => {
            coverSrc.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

const copyrightCheck = ref("non-select");
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"

.create-form
    margin-top: 30px
    padding: 50px
    min-height: 300px
    border-radius: 20px
    border: 2px solid rgba(0, 0, 0, 0.15)
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1)

    position: relative
    display: flex
    flex-flow: row wrap
    justify-content: center
    gap: 100px

    .cover-form
        h3
            margin-bottom: 10px
            margin-left: 10px
            font-size: 20px

        input
            display: none

        .cover-input
            width: 300px
            height: 400px
            margin-bottom: 10px
            border-radius: 10px
            background-color: lightgray
            overflow: hidden
            cursor: pointer

            img
                width: 100%
                height: 100%
                object-fit: cover
                object-position: center
                transition: transform 0.6s ease // 부드러운 확대 효과를 위한 전환

                &:hover
                    transform: scale(1.05) // 마우스 오버 시 이미지 확대


        .cover-copyright
            display: flex
            align-items: center
            gap: 10px

            label
                font-size: 13px

            select
                height: 20px
                flex-grow: 1


    .info-form
        flex-grow: 1

.create-button
    position: absolute
    bottom: 10px
    right: 10px
</style>
