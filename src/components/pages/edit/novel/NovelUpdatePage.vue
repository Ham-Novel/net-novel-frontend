<template>
    <main>
        <article class="base-wrapper">
            <NovelEditSect v-model="formInput" @submit-novel="updateNovel"></NovelEditSect>
        </article>
    </main>
</template>

<script setup>
import NovelEditSect from "./feature/NovelEditSect.vue";

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

//form에 입력한 값을 novelToUpdate와 연동하는 변수
const formInput = computed({
    get: () => novelToUpdate,
    set: (value) => (novelToUpdate = value),
});

//페이지 로드 시 업데이트할 작품 정보 불러오기
onMounted(async () => {
    const data = await loadNovel();

    //프로퍼티만 수정, 객체를 새로 할당하면 reactive 반응성 해제됨
    Object.assign(novelOrigin);
    Object.assign(novelToUpdate, {
        title: data.title,
        tagNames: data.tags.map((tag) => tag.name),
        description: data.desc,
        setupImg: data.thumbnailUrl,
    });
});

//작품 정보 불러오는 메서드
async function loadNovel() {
    try {
        const data = await novelApi.getNovel(props.novelId);
        return data;
    } catch (error) {
        console.error("Failed to load novel data: ", error);
    }
}

//업데이트 버튼 이벤트 로직
async function updateNovel() {
    console.log(novelToUpdate);

    //업데이트 진행
    const updatedId = await novelApi.updateNovel(props.novelId, {
        novelId: props.novelId,
        title: novelToUpdate.title,
        description: novelToUpdate.description,
        tagNames: novelToUpdate.tagNames,
    });

    //작품 썸네일이 변경되었으면 DB에 저장
    //새로 img를 업로드하지 않았으면 imgFile === undefined
    if (novelToUpdate.imgFile ?? false) {
        await novelApi.setNovelThumbnail(props.novelId, novelToUpdate.imgFile);
    }

    //작품 관리 페이지로 이동
    router.push({ name: "work-manage" });
}
</script>

<style scoped lang="sass">
article
    margin-top: 30px
</style>
