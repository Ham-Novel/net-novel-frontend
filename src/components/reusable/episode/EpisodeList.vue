<template>
    <section class="episode-list">
        <EpisodeInfo v-if="options.info" v-model="sort" :novel-id="novelId"></EpisodeInfo>
        <section class="list">
            <table>
                <colgroup>
                    <col style="width: 30px" />
                    <col style="width: 60px" />
                    <col style="width: 320px" />
                    <col v-if="options.stats" style="width: 80px" />
                    <col v-if="options.stats" style="width: 80px" />
                    <col v-if="options.stats" style="width: 80px" />
                    <col v-if="options.stats" style="width: 40px" />
                    <col style="width: 120px" />
                </colgroup>
                <tbody>
                    <InfiniteScroll v-bind="scrollProps" ref="scrollRef">
                        <template v-slot:default="{ item }">
                            <EpiListElement
                                :episode="item"
                                :novel-id="novelId"
                                :stats="options.stats"
                            ></EpiListElement>
                        </template>
                    </InfiniteScroll>
                </tbody>
            </table>
        </section>
    </section>
</template>

<script setup>
import EpisodeInfo from "./EpisodeInfo.vue";
import EpiListElement from "../../reusable/episode/EpisodeItem.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";

import { onErrorCaptured, reactive, ref, watch } from "vue";
import { episodeApi } from "@/hooks/backendApi";

//novel id 값
const props = defineProps({
    novelId: {
        type: Number,
        required: true,
    },
    options: {
        type: Object,
        default: {
            info: true,
            stats: true,
        },
    },
});

//에피소드 목록 정렬
const sort = ref("initial");

//졍렬 변경 시 컴포넌트 재배열
watch(sort, (value) => {
    reload();
});

//스크롤 페이지 로드 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 30 },
    loadMethod: async (page, size) => {
        const loaditems = await episodeApi.getEpisodesByNovel(
            props.novelId,
            sort.value,
            page,
            size
        );
        return loaditems;
    },
});

//애피소드 리스트 재랜더링
const scrollRef = ref(null);
const reload = () => {
    scrollRef.value.reset();
};

//자식 컴포넌트 에러 핸들링
onErrorCaptured((err, instance, info) => {
    console.error("Error captured in Composition API:", err);
    console.error("Component:", instance);
    console.error("Info:", info);

    // false를 반환하면 상위 컴포넌트로 오류가 전파되지 않음
    return false;
});
</script>

<style lang="sass" scoped>
.list
    display: flex
    flex-direction: column
    margin-bottom: 10px


th, td
    padding: 10px
</style>
