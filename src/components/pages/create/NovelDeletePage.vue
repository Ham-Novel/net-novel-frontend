<template>
    <main>
        <article class="base-wrapper">
            <NovelEditSect
                v-model="formInput"
                @submit-novel="submit"
                :disabled="true"
            ></NovelEditSect>
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

//삭제할 작품 정보
const novelOrigin = reactive({});

//reactive는 v-model로 설정 불가
//computed 변수를 v-model로 설정하여 novelOrigin 값 변경
const formInput = computed({
    get: () => novelOrigin,
    set: (value) => (novelOrigin = value),
});

//페이지 로드 시 삭제할 작품 정보 불러오기
onMounted(async () => {
    const data = await loadNovel();
    Object.assign(novelOrigin, {
        title: data.title,
        tagNames: data.tags.map((tag) => tag.name),
        description: data.desc,
        imgFile: data.thumbnailUrl,
        copyright: "can-commercial",
    });
});

async function loadNovel() {
    try {
        const data = await novelApi.getNovel(props.novelId);
        return data;
    } catch (error) {
        console.error("Failed to load novel data: ", error);
    }
}

//삭제 버튼 이벤트 로직
//에러 처리
async function submit() {
    try {
        await deleteNovel();
    } catch (error) {
        console.error("작품 업데이트 실패");
    }
}

async function deleteNovel() {
    // 작품명과  row 생성 및 저장
    const deletedId = await novelApi.deleteNovel(props.novelId, {
        novelId: props.novelId,
    });

    //작품 썸네일 DB에서 삭제?

    //작품 관리 페이지로 이동
    router.push({ name: "work-manage" });
}
</script>

<style scoped lang="sass">
article
    margin-top: 30px
</style>
