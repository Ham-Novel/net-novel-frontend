<template>
    <section class="library-header">
        <div class="header-info base-wrapper">
            <h1 class="title">Library</h1>
            <h3><TabRouter :tabs="tabs"></TabRouter></h3>
        </div>
    </section>
</template>

<script setup>
import TabRouter from "@/components/reusable/tab/TabRouter.vue";
import { ref } from "vue";

//선택 가능한 탭 메뉴
const tabs = ref([
    { name: "선호작", path: { name: "favorite" } },
    { name: "최근 기록", path: { name: "history" } },
]);
</script>

<style lang="sass" scoped>

.library-header
    display: relative
    background-color: var(--bg-sub)

.header-info
    .title
        font-size: 40px
        font-weight: 800
        padding: 30px 0
</style>
