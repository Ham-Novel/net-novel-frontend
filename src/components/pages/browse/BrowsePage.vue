<template>
    <main>
        <div class="browse-feature">
            <div class="feature-divider base-wrapper">
                <BrowseFilter class="filter-by"></BrowseFilter>
                <BrowseSort class="sort-by"></BrowseSort>
            </div>
        </div>
        <section class="browse-result">
            <div class="browse-content base-wrapper base-distance">
                <InfiniteScroll
                    class="browse-novel-list"
                    :load-method="loadNovels"
                    :page-props="{ number: 0, size: 10 }"
                    loading-message="Browse Loading...."
                >
                    <template v-slot:default="{ item }">
                        <NovelListItem
                            class="browse-novel-item"
                            :brief="{
                                id: item.id,
                                title: item.title,
                                coverImg: item.thumbnailUrl,
                            }"
                            :size="itemSize"
                        >
                            <div class="tag">
                                <span v-for="tag in item.tags" :key="tag.id"
                                    >#{{ tag.name }}</span
                                >
                            </div>
                            <p class="desc">
                                {{ item.desc }}
                            </p>
                        </NovelListItem>
                    </template>
                </InfiniteScroll>
            </div>
        </section>
    </main>
</template>

<script setup>
import NovelListItem from "@/components/reusable/novel/NovelListItem.vue";
import BrowseFilter from "./BrowseFilter.vue";
import BrowseSort from "./BrowseSort.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";

import { novelApi } from "@/backendApi";

//NovelListItem 크기
const itemSize = {
    width: "450px",
    height: "150px",
};

//작품 데이터 로드
const loadNovels = async (page, size) => {
    const loadData = await novelApi.getBrowseNovels(page, size);
    return loadData;
};
</script>

<style lang="sass" scoped>
@use "@/assets/base.sass"

.browse-feature
    display: relative

.feature-divider
    height: 200px
    display: flex
    flex-flow: row wrap

    .filter-by
        flex: 1
        padding: 30px

    .sort-by
        flex: 1
        padding: 30px

.browse-content
    padding-top: 30px


.browse-novel-list
    display: flex
    justify-content: flex-start
    flex-flow: row wrap
    gap: 30px

    .browse-novel-item
        .tag
            margin-bottom: 5px

            span
                margin-right: 8px
                font-size: 13px
                font-weight: bold
                color: blue
                cursor: pointer

                &:hover
                    text-decoration: underline

        .desc
            max-height: 80px
            font-size: 15px
            overflow: hidden
            overflow-wrap: break-word
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 3 /* 표시할 줄 수 */
            -webkit-box-orient: vertical

.line
  border-top: 1px solid #444444
  margin: 10px 0px
</style>
