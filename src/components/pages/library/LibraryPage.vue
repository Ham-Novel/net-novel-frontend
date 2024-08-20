<template>
    <main>
        <section class="library-header">
            <div class="header-info base-wrapper">
                <h1 class="title">Library</h1>
                <TabRouter :tabs="tabs"></TabRouter>
            </div>
        </section>
        <router-view></router-view>
    </main>
</template>

<script setup>
import TabList from "@/components/reusable/TabList.vue";
import TabRouter from "@/components/reusable/TabRouter.vue";
import { ref } from "vue";

//선택 가능한 탭 메뉴
const tabs = ref({
    favorites: { name: "선호작", path: "/library/favorites" },
    history: { name: "최근 기록", path: "/library/history" },
});
</script>

<style lang="sass" scoped>
@use "@/assets/base.sass"

.library-header
    display: relative
    // height: 200px
    background-color: #f5f6fc

.header-info
    .title
        font-size: 40px
        padding: 30px 0
</style>
