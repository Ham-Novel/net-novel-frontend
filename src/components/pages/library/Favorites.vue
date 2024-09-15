<template>
    <section>
        <div class="base-wrapper base-distance">
            <div class="favorites">
                <template v-for="favorite in favorites.list">
                    <FavoriteCardItem :novel="favorite"></FavoriteCardItem>
                </template>
            </div>
        </div>
    </section>
</template>

<script setup>
import FavoriteCardItem from "./FavoriteCardItem.vue";
import { onMounted, reactive, ref } from "vue";
import { memberApi } from "@/hooks/backendApi";

//선호작 데이터 저장 변수
const favorites = reactive({
    list: [],
    loadMethod: async () => {
        const novels = await memberApi.getFavoriteNovels();
        favorites.list.push(...novels);
    },
});

//페이지 로드 시 실행
onMounted(() => {
    favorites.loadMethod();
});
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"

.favorites
    padding-top: 30px
    display: flex
    flex-flow: row wrap
    gap: 25px

    .author
        font-size: 14px
        color: gray
</style>
