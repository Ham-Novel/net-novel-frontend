<template>
    <section class="studio-header base-distance">
        <div class="studio-navi base-wrapper">
            <h1 class="studio-title">Work Studio</h1>
            <TabRouter :tabs="tabs" v class="studio-menu"></TabRouter>
        </div>
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
.studio-header
    background-color: #f5f6fc

.studio-navi
    position: relative

    .studio-title
        padding: 20px
        padding-left: 50px
        font-size: 40px
        font-weight: bold

    .studio-menu
        padding: 10px
</style>
