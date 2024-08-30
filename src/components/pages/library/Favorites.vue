<template>
    <section>
        <div class="base-wrapper base-distance">
            <div class="favorites">
                <template v-for="novel in favorites">
                    <NovelCardItem :size="itemSize" :brief="getItemBrief(novel)">
                        <p class="author">작가명</p>
                    </NovelCardItem>
                </template>
            </div>
        </div>
    </section>
</template>

<script setup>
import NovelCardItem from "@/components/reusable/novel/NovelCardItem.vue";
import { onMounted, ref } from "vue";
import { memberApi } from "@/hooks/backendApi";

//NovelCardItem 크기
const itemSize = ref({
    width: "160px",
    height: "260px",
});

//NovelCardItem에 보낼 데이터
function getItemBrief(novel) {
    return {
        id: novel.novelId,
        title: novel.title,
        coverImg: novel.thumbnailUrl,
    };
}

//선호작 데이터 저장 변수
const favorites = ref([]);

//데이터 로드 메서드
function loadFavorites() {
    memberApi.getFavoriteNovels().then((novels) => {
        favorites.value.push(...novels);
    });
}

//페이지 로드 시 실행
onMounted(() => {
    loadFavorites();
});
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"

.favorites
    padding-top: 30px
    display: flex
    flex-flow: row wrap
    gap: 20px

    .author
        font-size: 14px
        color: gray
</style>
