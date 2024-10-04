<template>
    <section class="episode-list base-wrapper base-distance">
        <div class="header">
            <div class="data">
                <span>총 {{ episodesInfo.data.chapterCount }}화</span>
                <span>최신 업데이트 날짜: {{ episodesInfo.data.lastUpdatedAt }}</span>
            </div>
            <div class="sort">
                <label for="initial">
                    <input
                        type="radio"
                        name="episode-sort"
                        id="initial"
                        value="initial"
                        v-model="sort"
                    />
                    첫화부터
                </label>
                <label for="recent">
                    <input
                        type="radio"
                        name="episode-sort"
                        id="recent"
                        value="recent"
                        v-model="sort"
                    />
                    최신순
                </label>
            </div>
        </div>
        <div class="list">
            <table>
                <colgroup>
                    <col style="width: 30px" />
                    <col style="width: 60px" />
                    <col style="width: 320px" />
                    <col style="width: 80px" />
                    <col style="width: 80px" />
                    <col style="width: 80px" />
                    <col style="width: 40px" />
                    <col style="width: 120px" />
                </colgroup>
                <tbody>
                    <InfiniteScroll v-bind="scrollProps" ref="scrollRef">
                        <template v-slot:default="{ item }">
                            <EpiListElement :episode="item" :novel-id="novelId"></EpiListElement>
                        </template>
                    </InfiniteScroll>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script setup>
import EpiListElement from "../../reusable/item/EpisodeItem.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";

import { onMounted, reactive, ref, watch } from "vue";
import { episodeApi } from "@/hooks/backendApi";
import { formatUtil } from "@/hooks/format";

//novel id 값
const props = defineProps({
    novelId: {
        type: Number,
        required: true,
    },
});

const sort = ref("initial");

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

//작품 에피소드의 메타 데이터 로드
const episodesInfo = reactive({
    data: {
        chapterCount: 0,
        lastUpdatedAt: "",
    },
    async load() {
        const resp = await episodeApi.getEpisodesInfoByNovel(props.novelId);
        this.data.chapterCount = resp.chapterCount;
        this.data.lastUpdatedAt = formatUtil.formatDate(resp.lastUpdatedAt);
    },
});

onMounted(() => {
    episodesInfo.load();
});
</script>

<style lang="sass" scoped>

// .episode-list-section

.header
    border-bottom: 2px solid var(--pico-text-color)
    font-size: 0.9rem
    padding: 10px
    margin-bottom: 10px

    .data
        margin-bottom: 10px
        display: flex
        flex-direction: row
        justify-content: space-between

    .sort
        display: flex
        flex-flow: row wrap
        justify-content: end
        gap: 20px

        label
            margin: 0
        input
            width: 20px
            height: 20px
            margin: 0


.list
    display: flex
    flex-direction: column
    margin-bottom: 10px


th, td
    padding: 10px
</style>
