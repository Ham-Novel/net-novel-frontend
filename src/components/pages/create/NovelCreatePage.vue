<template>
    <article class="novel-create-page">
        <form @submit.prevent class="create-form base-wrapper">
            <section class="cover-form">
                <h3>북커버 표지</h3>
                <CoverUpload v-model="imgFile"></CoverUpload>
                <div class="cover-copyright">
                    <label for="cover-copyright-check"> 표지 사용 규정 : </label>
                    <select
                        id="cover-copyright-check"
                        name="cover-copyright-check"
                        v-model="copyrightCheck"
                    >
                        <option value="non-select">선택해주세요</option>
                        <option value="own-copyright">표지 저작권 소유</option>
                        <option value="can-commercial">표지 상업적 이용 가능</option>
                    </select>
                </div>
            </section>
            <section class="info-form">
                <h3>작품 상세</h3>
                <div class="novel-info">
                    <div>
                        <p>작품명</p>
                        <input type="text" v-model="title" />
                    </div>
                    <TagInput v-model="tags"></TagInput>
                    <div>
                        <p>작품 소개</p>
                        <textarea name="desc" v-model="desc"></textarea>
                    </div>
                    <div>
                        <p>독점작 여부</p>
                        <Radio
                            :radio-list="ifExclusive.list"
                            :group="ifExclusive.group"
                            v-model="ifExclusive.selected"
                        ></Radio>
                    </div>
                    <div>
                        <p>연재 요일</p>
                        <CheckBox
                            :list="uploadPlan.list"
                            :group="uploadPlan.group"
                            v-model="uploadPlan.selected"
                        ></CheckBox>
                    </div>
                </div>
            </section>
            <button class="create-button" @click="submitNovel">작품 등록</button>
        </form>
    </article>
</template>

<script setup>
import CoverUpload from "./CoverUpload.vue";
import TagInput from "./TagInput.vue";
import CheckBox from "@/components/reusable/CheckBox.vue";
import Radio from "@/components/reusable/Radio.vue";

import { ref } from "vue";
import { novelApi } from "@/hooks/backendApi";
import { useRouter } from "vue-router";

const router = useRouter();

const imgFile = ref(); //제출할 multipart file 값

const copyrightCheck = ref("non-select");

async function submitNovel() {
    const createdId = await novelApi.createNovel({
        title: title.value,
        description: desc.value,
        tagNames: tags.value,
    });
    await novelApi.setNovelThumbnail(createdId, imgFile.value);

    router.push({ name: "work-manage" });
}

const ifExclusive = {
    list: [
        { name: "독점작", id: "1", value: "exclusive" },
        { name: "다중 플랫폼 연재", id: "2", value: "non-exclusive" },
    ],
    group: "if-exclusive",
    selected: "exclusive",
};

const uploadPlan = {
    list: [
        { name: "월", id: "3", value: "mon" },
        { name: "화", id: "4", value: "tue" },
        { name: "수", id: "5", value: "wed" },
        { name: "목", id: "6", value: "thu" },
        { name: "금", id: "7", value: "fri" },
        { name: "토", id: "8", value: "sat" },
        { name: "일", id: "9", value: "sun" },
    ],
    group: "upload-plan",
    selected: [],
};

const title = ref("");
const tags = ref("");
const desc = ref("");
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"

.create-form
    margin-top: 30px
    margin-bottom: 30px
    padding: 50px
    min-height: 300px
    border-radius: 20px
    border: 2px solid rgba(0, 0, 0, 0.15)
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1)

    position: relative
    display: flex
    flex-flow: row wrap
    justify-content: center
    gap: 60px

    h3
        margin-bottom: 10px
        padding-left: 10px
        padding-bottom: 5px
        font-size: 23px
        border-bottom: 2px solid gray

    .cover-form

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

        .novel-info
            display: flex
            flex-flow: column wrap
            gap: 10px

            div
                min-height: 50px

            p
                margin: 5px

            input[type=text]
                width: 100%
                height: 25px

            label
                margin-right: 10px

            textarea
                width: 100%
                height: 200px

.create-button
    position: absolute
    bottom: 10px
    right: 10px
</style>
