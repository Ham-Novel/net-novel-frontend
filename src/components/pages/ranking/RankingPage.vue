<template>
    <main>
        <section class="top300 base-distance">
            <div class="ranking-wrapper base-wrapper">
                <h1 class="ranking-title">Top 300</h1>
                <div class="ranking-list">
                    <template v-for="novel in novels">
                        <div>
                            <h1 class="rank">{{ novel.rank }}</h1>
                            <NovelCardItem
                                :item-size="itemSize"
                                :brief="{
                                    id: novel.id,
                                    title: novel.title,
                                    coverImg: 'public/cover/fantasy_cover.jpeg',
                                }"
                            >
                            </NovelCardItem>
                        </div>
                    </template>
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

const novels = ref(
    Array.from({ length: 13 }, (_, i) => {
        return { id: i + 1, title: `소설 이름${i}`, rank: i + 1 };
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
