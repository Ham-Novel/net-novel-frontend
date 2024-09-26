<template>
    <main>
        <article class="base-wrapper">
            <NovelEditSect v-model="novelFormData" @submit-novel="submit"></NovelEditSect>
        </article>
    </main>
</template>

<script setup>
import NovelEditSect from "./NovelEditSect.vue";

import { reactive } from "vue";
import { useRouter } from "vue-router";
import { novelApi } from "@/hooks/backendApi";

const router = useRouter();

//유저가 입력한 작품 정보 데이터
const novelFormData = reactive({});

async function submit() {
    try {
        await createNovel();
    } catch (error) {
        console.error("작품 생성 실패");
    }
}

async function createNovel() {
    // 작품명과  row 생성 및 저장
    const createdId = await novelApi.createNovel({
        title: novelFormData.title,
        description: novelFormData.description,
        tagNames: novelFormData.tagNames,
    });

    //작품 썸네일을 업로드 했으면 DB에 저장
    if (novelFormData.imgFile ?? false) {
        await novelApi.setNovelThumbnail(createdId, novelFormData.imgFile);
    }

    //작품 관리 페이지로 이동
    router.push({ name: "work-manage" });
}
</script>

<style scoped lang="sass">
article
    margin-top: 30px
</style>
