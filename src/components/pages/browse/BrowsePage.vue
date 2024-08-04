<template>
    <main>
        <div class="browse-feature">
            <div class="feature-divider base-wrapper">
                <BrowseFilter class="filter-by"></BrowseFilter>
                <BrowseSort class="sort-by"></BrowseSort>
            </div>
        </div>
        <section class="browse-result">
            <div class="browse-novel-list base-wrapper base-distance">
                <NovelListItem>
                    <template v-slot:default>
                        <div class="novel-info">
                            <h1 class="title">{{ itemInfo.title }}</h1>
                            <p class="desc">
                                {{ itemInfo.desc }}
                            </p>
                        </div>
                    </template>
                </NovelListItem>
            </div>
        </section>
    </main>
</template>

<script setup>
import NovelListItem from "@/components/reusable/NovelListItem.vue";
import BrowseFilter from "./BrowseFilter.vue";
import BrowseSort from "./BrowseSort.vue";
import { ref, computed } from "vue";

const itemInfo = ref({
    title: `소설 이름`,
    desc: `Incididunt cillum cillum deserunt cillum. Aliqua nulla non
                aliquip ut mollit nostrud ea et minim occaecat. Proident irure
                deserunt Lorem laboris quis ex do officia. Reprehenderit
                exercitation occaecat veniam ad officia. Cupidatat mollit
                adipisicing labore laboris. Eu quis ex sint mollit sunt amet do
                eu in sunt. Dolore exercitation do id consequat amet dolore
                proident. Minim aliquip adipisicing commodo deserunt. Labore
                excepteur anim sunt sunt magna adipisicing Lorem consectetur.
                Ipsum in cillum incididunt nulla nulla id irure excepteur eu
                nisi amet ipsum.`,
    episodeCount: 100,
    progress: 5,
    isFavorite: false,
});
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


.browse-novel-list
    padding-top: 30px
    display: flex
    justify-content: flex-start
    flex-flow: column wrap
    gap: 30px

    .novel-info
            position: relative

            .title
                height: 30px
                margin-bottom: 5px
                font-size: 24px
                font-weight: bold

            .desc
                max-height: 80px
                font-size: 16px
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
