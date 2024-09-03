<template>
    <section>
        <div class="base-wrapper base-distance">
            <InfiniteScroll class="histories" v-bind="scrollProps">
                <template #default="{ item }">
                    <HistoryListItem :novel="item"></HistoryListItem>
                </template>
            </InfiniteScroll>
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
@use "@/assets/base.sass"

.histories
    padding-top: 30px
    display: flex
    justify-content: flex-start
    flex-flow: column wrap
    gap: 10px


    .history-item
        p
            font-size: 14px
            color: gray

        .progress
            position: absolute
            bottom: 10px
            height: 30px
</style>
