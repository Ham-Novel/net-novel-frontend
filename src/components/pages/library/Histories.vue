<template>
    <section>
        <div class="base-wrapper base-distance">
            <div class="histories">
                <InfiniteScroll v-bind="scrollProps">
                    <template #default="{ item }">
                        <HistoryListItem :novel="item"></HistoryListItem>
                        <div class="line"></div>
                    </template>
                </InfiniteScroll>
            </div>
        </div>
    </section>
</template>

<script setup>
import HistoryListItem from "./HistoryListItem.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";

import { ref, onMounted, reactive } from "vue";
import { memberApi } from "@/hooks/backendApi";

//InfiniteScroll props 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 30 },
    loadMethod: async (page, size) => {
        const novels = memberApi.getRecentReadNovels(page, size);
        return novels;
    },
    loadingMessage: "Record Loading...",
});
</script>

<style scoped lang="sass">


.histories
    padding-top: 30px
    min-height: 500px
    display: flex
    justify-content: flex-start
    flex-flow: column wrap
    gap: 10px


.line
    border-bottom: 2px solid var(--line-color)
</style>
