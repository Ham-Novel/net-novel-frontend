<template>
    <BaseHomeSection>
        <template #header>
            <h2>
                <TrendingUp class="icon" />
                <span>Daily Ranking</span>
            </h2>
        </template>
        <template #default>
            <div class="ranking-grid">
                <HomeCardItem
                    v-if="rankingFirst ?? false"
                    :novel="rankingFirst"
                    :rank="1"
                ></HomeCardItem>
                <template v-for="(item, rank) in rankingList" :key="rank">
                    <HomeCardItem class="item" :novel="item" :rank="rank + 2"></HomeCardItem>
                </template>
            </div>
        </template>
    </BaseHomeSection>
</template>

<script setup>
import HomeCardItem from "./HomeCardItem.vue";
import BaseHomeSection from "./BaseHomeSection.vue";

import { TrendingUp } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { novelApi } from "@/hooks/backendApi";

const rankingFirst = ref(undefined);
const rankingList = ref([]);

const loadRanking = async () => {
    const loadNovels = await novelApi.getRanking(0, 9, "daily");
    rankingFirst.value = loadNovels.shift();
    rankingList.value.push(...loadNovels);
};

onMounted(() => {
    loadRanking();
});
</script>

<style scoped lang="sass">

h2
    font-size: inherit
    display: flex
    align-items: center
    gap: 10px

.ranking-grid
    position: relative
    display: grid
    grid-template-rows: repeat(2, 1fr)
    grid-template-columns: repeat(6, 1fr)
    gap: 20px 20px
    justify-items: center



.item
    margin-bottom: 0
    width: 100%

    &:nth-child(1)
        grid-column: 1 / 3
        grid-row: 1 / 3

// .novel-card {
//     background-color: white
//     padding: 1rem
//     border-radius: 0.5rem
//     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
//     transition: box-shadow 0.3s ease
// }

// .novel-card:hover {
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
// }

// .novel-cover {
//     background-color: #e5e7eb
//     border-radius: 0.25rem
//     margin-bottom: 0.75rem
// }

// .novel-rank {
//     font-size: 1.5rem
//     font-weight: bold
//     color: #4f46e5
//     margin-bottom: 0.25rem
// }

// .novel-author {
//     font-size: 0.875rem
//     color: #4b5563
// }

// .novel-title {
//     font-weight: 500
//     margin-bottom: 0.25rem
// }

// .novel-description {
//     font-size: 0.875rem
//     color: #6b7280
//     overflow: hidden /* 넘치는 텍스트 숨기기 */
//     text-overflow: ellipsis /* 넘치는 텍스트에 '...' 표시 */
// }

// .novel-content {
//     display: flex
//     width: 100%
//     height: 100%
// }
// .novel-info {
//     width: 100%
//     height: 100%
// }

// .middle-novel .novel-cover {
//     width: 100%
//     height: 50%
// }

// .top-novel .novel-cover {
//     width: 66.666%
//     margin-right: 1rem
// }

// .top-novel .novel-info {
//     width: 33.333%
// }

// .top-novel .novel-rank {
//     font-size: 1.875rem
// }

// .top-novel .novel-title {
//     font-size: 1.25rem
// }
</style>
