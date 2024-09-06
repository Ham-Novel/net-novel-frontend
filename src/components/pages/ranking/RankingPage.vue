<template>
    <section class="top300 base-distance">
        <div class="ranking-wrapper base-wrapper">
            <h1 class="ranking-title">Top 300</h1>
            <div class="ranking-list">
                <InfiniteScroll v-bind="scrollProps">
                    <template #default="{ item, index }">
                        <RankingCardItem :novel="item" :index="index + 1"></RankingCardItem>
                    </template>
                </InfiniteScroll>
            </div>
        </div>
    </section>
</template>

<script setup>
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";
import RankingCardItem from "./RankingCardItem.vue";

import { novelApi } from "@/hooks/backendApi";
import { reactive } from "vue";

//InfiniteScroll props 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 30 },
    loadMethod: async (page, size) => {
        const loadItems = await novelApi.getRanking(page, size, "daily");
        console.log(loadItems);
        return loadItems;
    },
    loadingMessage: "Ranking Loading...",
});
</script>

<style scoped lang="sass">
@use '@/assets/base.sass'

.top300
    margin-top:50px

.ranking-wrapper
    width: 1000px

    .ranking-title
        margin-bottom: 30px
        font-size: 40px

    .ranking-list
        padding: 10px
        position: relative
        display: flex
        flex-flow: row wrap
        justify-content: center
        gap: 10px
</style>
