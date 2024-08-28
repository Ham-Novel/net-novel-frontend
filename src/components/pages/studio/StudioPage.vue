<template>
    <section>
        <h1>Studio</h1>
        <TabRouter :tabs="tabs"></TabRouter>
    </section>
    <router-view></router-view>
</template>

<script setup>
import TabRouter from "@/components/reusable/TabRouter.vue";
import { ref } from "vue";

const tabs = ref([
    { name: "작품 관리", path: { name: "work-manage" } },
    { name: "후원 관리", path: { name: "tip-manage" } },
    { name: "작품 통계", path: { name: "work-stat" } },
    { name: "정산", path: { name: "settlement" } },
]);
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"
</style>
