<template>
    <article class="work-manage-article">
        <NewbieGuide
            v-if="works.length === 0"
            @create-novel-event="goToCreateNovelPage"
            class="base-wrapper"
        ></NewbieGuide>
        <template v-else>
            <button class="create-novel-button" @click="goToCreateNovelPage">
                <SquarePen size="28" />
            </button>
            <WorkList :novel-list="works"></WorkList>
        </template>
    </article>
</template>

<script setup>
import NewbieGuide from "./NewbieGuide.vue";
import WorkList from "./WorkList.vue";

import { memberApi } from "@/hooks/backendApi";
import { SquarePen } from "lucide-vue-next";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const works = ref([]);

const loadWorks = async () => {
    const data = await memberApi.getWorks();
    works.value.push(...data);
};

onMounted(() => {
    try {
        loadWorks();
    } catch (error) {
        console.error("작품 리스트 생성 실패");
    }
});

const router = useRouter();

function goToCreateNovelPage() {
    router.push({ name: "novel-create" });
}
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"

article
    position: relative
    margin-top: 30px

.create-novel-button
    position: fixed
    bottom: 50px
    left: 50px
    z-index: 1

    width: 50px
    height: 50px
    border-radius: 12px
    background-color: black
    color: white

    cursor: pointer
    transition: all 0.2s ease
    &:hover
        transform: scale(0.9)

    *
        padding: 1px
</style>
