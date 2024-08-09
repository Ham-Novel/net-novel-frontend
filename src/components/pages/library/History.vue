<template>
    <section>
        <div class="base-wrapper base-distance">
            <div class="histories">
                <template v-for="novelInfo in recentReadNovels">
                    <NovelListItem
                        :size="itemSize"
                        :brief="getItemBrief(novelInfo)"
                        class="history-item"
                    >
                        <template v-slot:default>
                            <p>{{ novelInfo.authorName }}</p>
                            <p>{{ novelInfo.novelType }}</p>
                            <p>{{ novelInfo.updatedAt }}</p>
                            <p></p>
                        </template>
                        <template v-slot:feature>
                            <div class="item-feature">
                                <button class="continue-reading">
                                    {{ novelInfo.episodeTitle }} >>
                                </button>
                                <button class="add-library">+선호작</button>
                            </div>
                        </template>
                    </NovelListItem>
                </template>
            </div>
        </div>
    </section>
</template>

<script setup>
import NovelListItem from "@/components/reusable/novel/NovelListItem.vue";
import { ref, computed, onMounted } from "vue";
import { memberApi } from "@/backendApi";

//데이터 데이터 저장 변수
const recentReadNovels = ref([]);

//데이터 로드하는 메서드
function loadReadNovels() {
    memberApi.getRecentReadNovels().then((novels) => {
        recentReadNovels.value.push(...novels);
        console.log(recentReadNovels.value);
    });
}

//NovelListItem 크기
const itemSize = ref({ height: "150px" });

//NovelListItem에 보낼 데이터
function getItemBrief(itemInfo) {
    return {
        id: itemInfo.novelId,
        title: itemInfo.novelTitle,
        coverImg: "public/cover/modern_cover.jpeg",
    };
}

//컴포넌트 생성 시 데이터 로드 실행
onMounted(() => {
    loadReadNovels();
});

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
