<template>
    <main>
        <section class="top200 base-wrapper base-distance">
            <div class="header">
                <h1 class="title">Top 200</h1>
                <h2 class="desc">지금 가장 인기 있는 소설 TOP 200입니다!</h2>
            </div>
            <div class="list">
                <InfiniteScroll v-bind="scrollProps">
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
import { reactive } from "vue";

//InfiniteScroll props 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 50 },
    loadMethod: async (page, size) => {
        const loadItems = await novelApi.getRanking(page, size, "daily");
        console.log(loadItems);
        return loadItems;
    },
    loadingMessage: "Ranking Loading...",
});
</script>

<style scoped lang="sass">

.top200
    margin-top:50px
    width: 900px

.header
    margin-bottom: 30px

    .title
        font-size: 40px
        margin-bottom: 10px

    .desc
        font-size: 20px
        font-weight: 400

.list
    padding: 10px
    margin: 0 auto
    position: relative
    display: flex
    flex-flow: row wrap
    gap: 15px
</style>
