<template>
    <section class="top300 base-distance">
        <div class="ranking-wrapper base-wrapper">
            <h1 class="ranking-title">Top 300</h1>
            <InfiniteScroll class="ranking-list" :load-method="loadRankings" @add-items="addRankings">
                <template v-for="(novel, index) in rankings">
                    <div>
                        <h1 class="rank">{{ index + 1 }}</h1>
                        <NovelCardItem :size="itemSize" :brief="convertBrief(novel)"> </NovelCardItem>
                    </div>
                </template>
            </InfiniteScroll>
        </div>
    </section>
</template>

<script setup>
import NovelCardItem from "@/components/reusable/novel/NovelCardItem.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";

import { SignalZero } from "lucide-vue-next";
import { reactive, ref } from "vue";
import { novelApi } from "@/hooks/backendApi";

//NovelCardItem 크기
const itemSize = {
    width: "180px",
    height: "320px",
};

//NovelCardItem brief 데이터 전달
const convertBrief = (novel) => {
    return {
        id: novel.id,
        title: novel.title,
        coverImg: "public/cover/fantasy_cover.jpeg", //이미지 url 변수 전달하면 됨
    };
};

//무한 스크롤 적용 변수, 메서드
const pageNum = ref(0);
const pageSize = ref(30);
const rankings = reactive([]);

const addRankings = (newItems) => {
    rankings.push(...newItems);
};

const loadRankings = async () => {
    //실제 api 불러오기
    const loadItems = await novelApi.getRanking(pageNum.value, pageSize.value, "daily");
    pageNum.value++;
    return loadItems;
};
</script>

<style scoped lang="sass">
@use '@/assets/base.sass'

.top300
    margin-top:50px

.ranking-wrapper

    .ranking-title
        margin-bottom: 10px
        font-size: 25px

    .ranking-list
        position: relative
        display: flex
        flex-flow: row wrap
        gap: 15px

        .rank
            display: inline-block
            padding: 0px 12px
            margin-bottom: 5px
            background-color: #e0e0e0
            font-size: 20px
            border-radius: 15px
            text-align: center

        .title
            font-size: 18px
            overflow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 1
            -webkit-box-orient: vertical
</style>
