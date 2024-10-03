<template>
    <article class="modal">
        <section class="profile">
            <div class="img"><User size="40" color="white" /></div>
            <div class="info">
                <h1 class="nick-name">{{ userData.nickName }}</h1>
                <p class="stat"><BadgeCent size="20" />{{ userData.coinCount }}</p>
            </div>
        </section>
        <section class="setting">
            <article class="dark-mode">
                <Moon size="25" />
                <DarkModeSwitch></DarkModeSwitch>
            </article>
        </section>
        <button class="account-button" @click="goMyPage">Account</button>
    </article>
</template>

<script setup>
import DarkModeSwitch from "./DarkModeSwitch.vue";
import { User, Moon, BadgeCent } from "lucide-vue-next";
import { memberApi } from "@/hooks/backendApi";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const emits = defineEmits(["close"]);

const router = useRouter();
function goMyPage() {
    router.push({ name: "mypage" });
    emits("close");
}

const userData = ref({});
async function loadUserInfo() {
    userData.value = (await memberApi.getMyPageData()) ?? {
        nickName: "unknown",
        email: "unknown@unknown.com",
        coinCount: -10000,
    };
}

onMounted(() => {
    loadUserInfo();
});
</script>

<style scoped lang="sass">
.modal
    position: absolute
    top: 100%
    transform: translateX(-60%) //width를 기준으로 left 위치 설정

    width: fit-content

.profile
    display: flex
    align-items: center
    gap: 10px

    .img
        display: inline-block
        padding: 0.5rem
        background-color: var(--pico-primary)
        border-radius: 50%

    .info
        .nick-name
            display: inline-block
            width: 150px
            font-size: 1.3rem
            white-space: nowrap
            overflow: hidden

        .stat
            font-size: 0.8rem
            display: flex
            align-items: center

.setting
    .dark-mode
        display: flex
        align-items: center
        gap: 5px


.account-button
    width: 100%
</style>
