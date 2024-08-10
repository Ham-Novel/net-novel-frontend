<template>
    <section>
        <div class="base-wrapper base-distance">
            <InfiniteScroll
                class="histories"
                :load-method="loadReadNovels"
                @add-items="addItems"
                loading-message="Record Loading..."
            >
                <template v-for="novel in novels" :key="novel.id">
                    <NovelListItem
                        :size="itemSize"
                        :brief="getItemBrief(novel)"
                        class="history-item"
                    >
                        <template v-slot:default>
                            <p>{{ novel.authorName }}</p>
                            <p>{{ novel.novelType }}</p>
                            <p>{{ novel.updatedAt }}</p>
                            <p></p>
                        </template>
                        <template v-slot:feature>
                            <div class="item-feature">
                                <button class="continue-reading">
                                    {{ novel.episodeTitle }} >>
                                </button>
                                <button class="add-library">+선호작</button>
                            </div>
                        </template>
                    </NovelListItem>
                </template>
            </InfiniteScroll>
        </div>
    </section>
</template>

<script setup>
import NovelListItem from "@/components/reusable/novel/NovelListItem.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";

import { ref, onMounted, reactive } from "vue";
import { memberApi } from "@/backendApi";

//데이터 데이터 저장 변수
const novels = reactive([]);

const addItems = (newItems) => {
    novels.push(...newItems);
};

//데이터 로드하는 메서드
const loadReadNovels = async () => {
    const novels = memberApi.getRecentReadNovels(page.value, size.value);
    page.value++;
    return novels;
};

//페이지 관련 변수
const page = ref(0);
const size = ref(5);

//NovelListItem 크기
const itemSize = ref({ width: "100%", height: "150px" });

//NovelListItem에 보낼 데이터
function getItemBrief(itemInfo) {
    return {
        id: itemInfo.novelId,
        title: itemInfo.novelTitle,
        coverImg: "public/cover/modern_cover.jpeg",
    };
}

//선호작 버튼
// const isFavoriteMsg = (itemInfo) => {
//     if (itemInfo.isFavorite) {
//         return "-선호작";
//     } else {
//         return "+선호작";
//     }
// };
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


.item-feature
    position: absolute
    bottom: 0px
    right: 10px
    display: flex
    flex-flow: row wrap
    gap: 30px

    .continue-reading
        background: none
        border: none
        cursor: pointer

    .add-library
        background: none
        border: none
        height: 35px
        padding: 0 25px
        border-radius: 20px
        background-color: #e6e6fa
        cursor: pointer
</style>
