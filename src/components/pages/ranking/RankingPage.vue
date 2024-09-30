<template>
    <main>
        <section class="top200 base-wrapper base-distance">
            <div class="header">
                <h1 class="title">Top 200</h1>
                <h2 class="desc">지금 가장 인기 있는 소설 TOP 200입니다!</h2>
                <select class="sort" v-model="sortBy" id="sortBy">
                    <option value="daily">일간</option>
                    <option value="weekly">주간</option>
                    <option value="monthly">월간</option>
                </select>
            </div>
            <div class="list">
                <InfiniteScroll v-bind="scrollProps" ref="scrollRef">
                    <template #default="{ item, index }">
                        <RankingCardItem :novel="item" :index="index + 1"></RankingCardItem>
                    </template>
                </InfiniteScroll>
            </div>
        </section>
    </main>
</template>

<script setup>
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";
import RankingCardItem from "./RankingCardItem.vue";

import { novelApi } from "@/hooks/backendApi";
import { reactive, ref, watch } from "vue";

const sortBy = ref("daily");

//정렬을 변경할 때마다 데이터 리로드
watch(sortBy, (value) => {
    reload();
});

//InfiniteScroll props 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 50 },
    loadMethod: async (page, size) => {
        const loadItems = await novelApi.getRanking(page, size, sortBy.value);
        console.log(loadItems);
        return loadItems;
    },
    loadingMessage: "Ranking Loading...",
});

//스크롤 처음부터 다시 재로드하는 메서드
const scrollRef = ref(null);
const reload = () => {
    scrollRef.value.reset();
};
</script>

<style scoped lang="sass">
.top200
    margin-top:50px
    width: 900px

.header
    position: relative
    margin-bottom: 30px

    .title
        font-size: 40px
        margin-bottom: 10px

    .desc
        font-size: 20px
        font-weight: 400

    .sort
        position: absolute
        top: 0px
        right: 0px

        padding: 0.5rem
        width: 100px

.list
    padding: 10px
    margin: 0 auto
    position: relative
    display: flex
    flex-flow: row wrap
    gap: 25px
</style>
