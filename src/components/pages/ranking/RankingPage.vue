<template>
    <main>
        <section class="top300 base-distance">
            <div class="ranking-wrapper base-wrapper">
                <h1 class="ranking-title">Top 300</h1>
                <div class="ranking-list">
                    <NovelBoxItem
                        v-for="info in infoList"
                        :item-size="itemSize"
                    >
                        <h2 class="rank">{{ info.rank }}</h2>
                        <h1 class="title">{{ info.title }}</h1>
                    </NovelBoxItem>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import NovelBoxItem from "@/components/reusable/NovelBoxItem.vue";
import { SignalZero } from "lucide-vue-next";
import { ref } from "vue";

const itemSize = ref({
    width: 160,
    height: 260,
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

.ranking-wrapper
    margin-top: 30px

.ranking-title
    margin-bottom: 10px
    font-size: 25px

.ranking-list
    position: relative
    display: flex
    flex-flow: row wrap
    gap: 10px
    width: 840px
    margin: auto

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
