<template>
    <main>
        <article class="base-wrapper">
            <NovelEditSect v-model="formInput" @submit-novel="submit"></NovelEditSect>
        </article>
    </main>
</template>

<script setup>
import NovelEditSect from "./feature/NovelEditSect.vue";

import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { novelApi } from "@/hooks/backendApi";

const router = useRouter();

//유저가 입력한 작품 정보 데이터
let novelToCreate = reactive({ setupImg: "" });

//form에 입력한 값을 novelToUpdate와 연동하는 변수
const formInput = computed({
    get: () => (isEmpty(novelToCreate) ? undefined : novelToCreate),
    set: (value) => (novelToCreate = value),
});

//빈 객체인지 확인
function isEmpty(data) {
    return Object.keys(data).length === 0;
}

//submit 클릭 이벤트
async function submit() {
    try {
        await createNovel();
        router.push({ name: "work-manage" }); //작품 관리 페이지로 이동
    } catch (error) {}
}

async function createNovel() {
    // 작품명과  row 생성 및 저장
    const createdId = await novelApi.createNovel({
        title: novelToCreate.title,
        description: novelToCreate.description,
        tagNames: novelToCreate.tagNames,
    });

    //작품 썸네일을 업로드 했으면 DB에 저장
    if (novelToCreate.imgFile ?? false) {
        await novelApi.uploadNovelThumbnail(createdId, novelToCreate.imgFile);
    }
}
</script>

<style scoped lang="sass">
article
    margin-top: 30px
</style>
