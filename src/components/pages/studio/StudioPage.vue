<template>
    <main>
        <section class="studio-header">
            <div class="studio-navi base-wrapper">
                <h1 class="studio-title">Work Studio</h1>
                <h3><TabRouter :tabs="tabs" v class="studio-menu"></TabRouter></h3>
            </div>
        </section>
        <TabView></TabView>
    </main>
</template>

<script setup>
import TabView from "@/components/reusable/tab/TabView.vue";
import TabRouter from "@/components/reusable/tab/TabRouter.vue";
import { ref } from "vue";

const tabs = ref([
    { name: "작품 관리", path: { name: "work-manage" } },
    // { name: "후원 관리", path: { name: "tip-manage" } },
    // { name: "작품 통계", path: { name: "work-stat" } },
    { name: "정산", path: { name: "settlement" } },
]);
</script>
 
<style scoped lang="sass">
.studio-header
    background-color: var(--bg-sub)

.studio-navi
    position: relative

    .studio-title
        padding: 20px
        padding-left: 50px
        font-size: 40px
        font-weight: 800

    .studio-menu
        padding: 10px
</style>
