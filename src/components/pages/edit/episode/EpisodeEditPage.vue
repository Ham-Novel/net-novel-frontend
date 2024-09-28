<template>
    <main>
        <section class="novel-info base-wrapper">
            <h3 v-once>작품 에피소드 편집</h3>
            <ListItem
                v-if="novelInfo ?? false"
                :cover-img="novelInfo.thumbnailUrl"
                :link="{ name: 'novel', params: { id: novelInfo.id } }"
            >
                <div class="stats">
                    <h3>{{ novelInfo.title }}</h3>
                    <p>전체 화수 {{ novelInfo.episodeCount }}화</p>
                    <p>조회수: {{ novelInfo.views }}</p>
                    <p>평점 평균: {{ novelInfo.averageRating }}</p>
                    <p>선호작: {{ novelInfo.favoriteCount }}</p>
                </div>
            </ListItem>
        </section>
        <section class="episode-list base-wrapper">
            <table class="hover striped">
                <thead v-once>
                    <tr>
                        <th scope="col">회차</th>
                        <th scope="col">에피소드 제목</th>
                        <th scope="col">게시 일자</th>
                        <th scope="col" colspan="3">상세 정보</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th colspan="7">
                            <button class="create-button" @click="goToCreate">
                                새 에피소드 작성
                            </button>
                        </th>
                    </tr>
                    <InfiniteScroll v-bind="scrollProps">
                        <template v-slot:default="{ item }">
                            <EpisodeEditListItem
                                :novelId="novelId"
                                :episode="item"
                            ></EpisodeEditListItem>
                        </template>
                    </InfiniteScroll>
                </tbody>
            </table>
        </section>
    </main>
</template>

<script setup>
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";
import EpisodeEditListItem from "./EpisodeEditListItem.vue";
import ListItem from "@/components/reusable/novel/ListItem.vue";

import { onMounted, reactive, ref } from "vue";
import { episodeApi, novelApi } from "@/hooks/backendApi";
import { useRouter } from "vue-router";

//url params 데이터
const props = defineProps({
    novelId: {
        type: Number,
        required: true,
    },
});

const router = useRouter();

//에피소드 리스트 무한 스크롤
const scrollProps = reactive({
    pageProps: { number: 0, size: 30 },
    loadMethod: async (page, size) => {
        const loaditems = await episodeApi.getEpisodesByNovel(props.novelId, "recent", page, size);
        return loaditems;
    },
    loadingMessage: "Episode Loading...",
});

//작품 정보 불러오기
const novelInfo = ref(undefined);

async function loadNovel() {
    try {
        const data = await novelApi.getNovel(props.novelId);
        novelInfo.value = data;
    } catch (error) {
        console.error("Failed to load novel info: ", error);
    }
}

onMounted(() => {
    loadNovel();
});

//작품 생성 페이지 이동
function goToCreate() {
    router.push({ name: "episode-create", params: { id: props.novelId } });
}
</script>

<style lang="sass" scoped>
.stats
    height: 100%
    display: flex
    flex-flow: column nowrap
    justify-content: space-evenly

.create-button
    width: 100%
    height: 100%
</style>
