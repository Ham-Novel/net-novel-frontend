<template>
    <main>
        <article class="base-wrapper">
            <NovelEditSect v-model="formInput" @submit-novel="submit"></NovelEditSect>
        </article>
    </main>
</template>

<script setup>
import NovelEditSect from "./NovelEditSect.vue";

import { onMounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { novelApi } from "@/hooks/backendApi";

const router = useRouter();

//url params로 가져온 novel Id
const props = defineProps({
    novelId: {
        type: Number,
        required: true,
    },
});

//업데이트할 작품 정보
const novelOrigin = reactive({});

//유저가 입력한 작품 정보 수정사항
let novelToUpdate = reactive({});

const formInput = computed({
    get: () => novelToUpdate,
    set: (value) => (novelToUpdate = value),
});

//페이지 로드 시 업데이트할 작품 정보 불러오기
onMounted(async () => {
    const data = await loadNovel();
    Object.assign(novelOrigin);
    Object.assign(novelToUpdate, {
        title: data.title,
        tagNames: data.tags.map((tag) => tag.name),
        description: data.desc,
        // imgFile: urlToFile(data.thumbnailUrl, "thumbnail.jpg", "image/jpeg"),
        copyright: "can-commercial",
    });
});

//이미지 url을 file 객체로 변환
async function urlToFile(url, filename, mimeType) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
}

async function loadNovel() {
    try {
        const data = await novelApi.getNovel(props.novelId);
        console.log(data);
        return data;
    } catch (error) {
        console.error("Failed to load novel data: ", error);
    }
}

//업데이트 버튼 이벤트 로직
//작품 업데이트 및 에러 처리
async function submit() {
    await updateNovel();
}

async function updateNovel() {
    console.log(novelToUpdate);

    // 작품명과  row 생성 및 저장
    const updatedId = await novelApi.updateNovel(props.novelId, {
        novelId: props.novelId,
        title: novelToUpdate.title,
        description: novelToUpdate.description,
        tagNames: novelToUpdate.tagNames,
    });

    // //작품 썸네일이 변경되었으면 DB에 저장
    // if (novelToUpdate.imgFile !== novelOrigin.thumbnailUrl) {
    //     await novelApi.setNovelThumbnail(updatedId, updatedNovel.imgFile);
    // }

    //작품 관리 페이지로 이동
    router.push({ name: "work-manage" });
}
</script>

<style scoped lang="sass">
article
    margin-top: 30px
</style>
