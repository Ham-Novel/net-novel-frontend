<template>
    <main>
        <EpisodeList
            :novelId="props.novelId"
            :episodeId="props.episodeId"
        ></EpisodeList>
        <!-- <PayCheckDialog
            v-if="payRequired"
            v-model:activate="payRequired"
            :episode-id="episodeId"
            :cost-policy="costPolicy"
        >
        </PayCheckDialog> -->
    </main>
</template>

<script setup>
// import PayCheckDialog from "./PayCheckDialog.vue";
import EpisodeList from "./EpisodeList.vue";

import { onMounted, ref } from "vue";
import { useStore } from "vuex";

//에피소드 페이지에서는 네비게이션 비활성화
const store = useStore();
onMounted(() => {
    store.commit("navi/off");
});

//url에서 에피소드 id 데이터 가져오기
const props = defineProps({
    novelId: {
        type: Number,
        default: 0,
    },
    episodeId: {
        type: Number,
        default: 0,
    },
});

//에피소드 api 통신
const payRequired = ref(false); //결제창 띄울지 결정
// const costPolicy = ref({}); //에피소드 결제 관련 정보
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"

.episode-nav
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    z-index: 1000
    background-color: white
    border-top: 3px solid black
</style>
