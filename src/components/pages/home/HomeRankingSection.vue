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
    grid-template-rows: repeat(2, minmax(0, 1fr))
    grid-template-columns: repeat(6, minmax(0, 1fr))
    gap: 20px 20px
    justify-items: center

.item
    margin-bottom: 0
    width: 100%

    &:nth-child(1)
        grid-column: 1 / 3
        grid-row: 1 / 3
</style>
