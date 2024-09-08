<template>
    <article class="work-manage-article">
        <NewbieGuideSection
            v-if="works.list.length === 0"
            @create-novel-event="goToCreateNovelPage"
            class="base-wrapper"
        ></NewbieGuideSection>
        <template v-else>
            <button class="create-novel-button" @click="goToCreateNovelPage">
                <SquarePen size="30" />
            </button>
            <WorkListSection :novel-list="works.list"></WorkListSection>
        </template>
    </article>
</template>

<script setup>
import NewbieGuideSection from "./NewbieGuideSection.vue";
import WorkListSection from "./WorkListSection.vue";

import { memberApi } from "@/hooks/backendApi";
import { SquarePen } from "lucide-vue-next";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

const works = reactive({
    list: [],
    load: async () => {
        const resp = await memberApi.getWorks();
        const data = await resp?.json();
        if (data ?? false) {
            works.list.push(...data);
        }
    },
});

onMounted(() => {
    works.load();
});

const router = useRouter();

function goToCreateNovelPage() {
    console.log("ddd");
    router.push({ name: "novel-create" });
}
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"

.create-novel-button
    position: fixed
    bottom: 50px
    right: 100px
    z-index: 1

    width: 50px
    height: 50px
    border-radius: 20px
    background-color: black
    color: white

    cursor: pointer
    transition: all 0.2s ease
    &:hover
        transform: scale(0.9)

    *
        padding: 1px
</style>
