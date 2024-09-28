<template>
    <article class="base-wrapper">
        <template v-if="episodeOrigin ?? false">
            <EpisodeEditForm
                @submit="createEpisode"
                @form-input="getFormData"
                :initial-input="episodeOrigin"
            ></EpisodeEditForm>
        </template>
    </article>
</template>

<script setup>
import EpisodeEditForm from "./EpisodeEditForm.vue";

import { episodeApi } from "@/hooks/backendApi";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    novelId: {
        type: Number,
        required: true,
    },
    episodeId: {
        type: Number,
        required: true,
    },
});

const router = useRouter();

//업데이트할 에피소드 데이터 가져오기
const episodeOrigin = ref(undefined);

async function loadEpisodeData() {
    const data = await episodeApi.getEpisode(props.episodeId);
    return data;
}

onMounted(async () => {
    episodeOrigin.value = await loadEpisodeData();
    console.log(episodeOrigin.value);
});

//유저가 입력한 작품 정보 데이터
let episodeToUpdate = reactive({});

//edit form에서 값 가져오기
function getFormData(data) {
    episodeToUpdate = data;
}

//submit 클릭 이벤트
//에피소드 DB 생성
async function createEpisode() {
    console.log(episodeToUpdate);
    await episodeApi.updateEpisode({
        episodeId: props.episodeId,
        title: episodeToUpdate.title,
        content: episodeToUpdate.content,
        costPolicyId: episodeToUpdate.policyId,
    });

    router.push({ name: "episode-edit", params: { id: props.novelId } });
}
</script>

<style scoped lang="sass">
article
    margin-top: 30px
    margin-bottom: 30px
</style>
