<template>
    <main>
        <section class="library-header">
            <div class="header-info base-wrapper">
                <h1 class="title">Library</h1>
            </div>
        </section>
        <TabList :tabs="tabs" v-slot:default="slotProps">
            <component :is="slotProps.activeTab"></component>
        </TabList>
    </main>
</template>

<script setup>
import TabList from "@/components/reusable/TabList.vue";
import { markRaw, ref } from "vue";
import Favorites from "./Favorites.vue";
import History from "./History.vue";

const tabs = ref([
    { name: "선호작", component: markRaw(Favorites) },
    { name: "최근기록", component: markRaw(History) },
]);
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
