<template>
    <main>
        <section class="top300 base-distance">
            <div class="ranking-wrapper base-wrapper">
                <h1 class="ranking-title">Top 300</h1>
                <div class="ranking-list">
                    <NovelCardItem
                        v-for="info in infoList"
                        :item-size="itemSize"
                    >
                        <h2 class="rank">{{ info.rank }}</h2>
                        <h1 class="title">{{ info.title }}</h1>
                    </NovelCardItem>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import NovelCardItem from "@/components/reusable/novel/NovelCardItem.vue";
import { SignalZero } from "lucide-vue-next";
import { ref } from "vue";

const itemSize = ref({
    width: 140,
    height: 240,
    unit: "px",
});

const infoList = ref(
    Array.from({ length: 13 }, (_, i) => {
        return { title: `소설 이름${i}`, rank: i };
    })
);
</script>

<style scoped lang="sass">
@use '@/assets/base.sass'

.top300
    margin-top:100px

.ranking-wrapper

    .ranking-title
        margin-bottom: 10px
        font-size: 25px

    .ranking-list
        position: relative
        display: flex
        flex-flow: row wrap
        gap: 10px

        .rank
            font-size: 14px

        .title
            font-size: 18px
            overflow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 1
            -webkit-box-orient: vertical
</style>
