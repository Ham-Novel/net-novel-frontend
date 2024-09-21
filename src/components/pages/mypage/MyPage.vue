<template>
    <main>
        <section class="profile base-distance">
            <Profile
                v-if="userData ?? false"
                :nick-name="userData.nickName"
                :email="userData.email"
                :coins="userData.coinCount"
            >
                <TabRouter :tabs="tabs" class="mypage-menu base-wrapper"></TabRouter>
            </Profile>
        </section>
        <section class="base-distance">
            <TabView></TabView>
        </section>
    </main>
</template>

<script setup>
import Profile from "./Profile.vue";
import TabView from "@/components/reusable/TabView.vue";
import TabRouter from "@/components/reusable/TabRouter.vue";

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
@use "@/assets/base.sass"
.profile
    position: relative
    background-color: var(--bg-sub)
    padding-bottom: 20px

.mypage-menu
    margin-top: 30px
</style>
