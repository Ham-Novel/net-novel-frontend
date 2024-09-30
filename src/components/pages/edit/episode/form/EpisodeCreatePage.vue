<template>
    <article class="base-wrapper">
        <EpisodeEditForm @submit="submit" @form-input="getFormData"></EpisodeEditForm>
    </article>
</template>

<script setup>
import EpisodeEditForm from "./EpisodeEditForm.vue";

import { episodeApi } from "@/hooks/backendApi";
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    novelId: {
        type: Number,
        required: true,
    },
});

const router = useRouter();

//유저가 입력한 작품 정보 데이터
let episodeToCreate = reactive({});

//edit form에서 값 가져오기
function getFormData(data) {
    episodeToCreate = data;
}

//submit 클릭 이벤트
async function submit() {
    try {
        await createEpisode();
    } catch (error) {
        if (error.response.status === 500) {
            alert(
                "작품 생성에 오류가 발생하였습니다. 현상이 지속된다면 고객센터로 문의 부탁드립니다."
            );
        }
    }
}

//에피소드 DB 생성
async function createEpisode() {
    const createdId = await episodeApi.createEpisode(props.novelId, {
        novelId: props.novelId,
        title: episodeToCreate.title,
        content: episodeToCreate.content,
        costPolicyId: episodeToCreate.policyId,
    });

    router.push({ name: "episode-edit", params: { id: props.novelId } });
}
</script>

<style scoped lang="sass">
article
    margin-top: 30px
    margin-bottom: 30px
</style>
