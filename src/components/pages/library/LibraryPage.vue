<template>
    <main>
        <section class="library-header">
            <div class="header-info base-wrapper">
                <h1 class="title">Library</h1>
            </div>
            <TabList :tabs="tabs" v-model="currentTab"></TabList>
        </section>
        <component :is="currentTab"></component>
    </main>
</template>

<script setup>
import TabList from "@/components/reusable/TabList.vue";
import { markRaw, onMounted, ref } from "vue";
import Favorites from "./Favorites.vue";
import History from "./History.vue";
import { useRoute } from "vue-router";

//선택 가능한 탭 메뉴
const tabs = ref({
    favorites: { name: "선호작", component: markRaw(Favorites) },
    history: { name: "최근기록", component: markRaw(History) },
});

//현재 선택한 탭
const currentTab = ref(Favorites);

const route = useRoute();

const tab = route.query.tab ?? false;

// onMounted(() => {
//     console.log(tab);
//     if (tab) {
//         currentTab.value = tabs.value[tab].component;
//     }
// });
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
