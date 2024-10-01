<template>
    <main>
        <section class="profile">
            <Profile
                v-if="userData ?? false"
                :nick-name="userData.nickName"
                :email="userData.email"
                :coins="userData.coinCount"
            >
            </Profile>
        </section>
        <section class="menu">
            <h4><TabRouter :tabs="tabs" class="mypage-menu base-wrapper"></TabRouter></h4>
            <TabView></TabView>
        </section>
    </main>
</template>

<script setup>
import Profile from "./Profile.vue";
import TabView from "@/components/reusable/tab/TabView.vue";
import TabRouter from "@/components/reusable/tab/TabRouter.vue";

import { ref, onMounted, reactive } from "vue";
import { memberApi } from "@/hooks/backendApi";

const tabs = [
    { name: "유저정보", path: { name: "my-info" } },
    { name: "결제내역", path: { name: "my-payment" } },
    // { name: "설정관리", path: { name: "test" } },
    // { name: "친구관리", path: { name: "test" } },
];

const userData = ref(undefined);

async function loadUserData() {
    const data = await memberApi.getMyPageData();
    userData.value = data ?? {
        nickName: "unknown",
        email: "unknown@unknown.com",
        coinCount: 0,
    };
}
onMounted(() => {
    loadUserData();
});
</script>

<style lang="sass" scoped>

.profile
    position: relative
    background-color: var(--pico-code-background-color)
    padding-bottom: 20px

section.menu
    margin: 0
</style>
