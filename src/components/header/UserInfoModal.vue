<template>
    <article class="modal">
        <section v-if="userData" class="profile">
            <div class="img"><User size="40" color="white" /></div>
            <div class="info">
                <h1 class="nick-name">{{ userData.nickName }}</h1>
                <p class="stat"><BadgeCent size="20" />{{ userData.coinCount }}</p>
            </div>
        </section>
        <section v-else class="profile">
            <article class="sign-up-msg">
                <h1>계정을 만들어</h1>
                <h1>수많은 작품들을</h1>
                <h1>누리세요!</h1>
            </article>
        </section>
        <section class="setting">
            <article class="dark-mode">
                <p>다크 모드</p>
                <DarkModeSwitch class="switch"></DarkModeSwitch>
            </article>
        </section>
        <button v-if="userData" class="account-button" @click="goMyPage">Account</button>
        <button v-else class="account-button" @click="goLoginPage">Login</button>
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
function goLoginPage() {
    router.push({ name: "login" });
    emits("close");
}

const userData = ref(undefined);
async function loadUserInfo() {
    try {
        userData.value = await memberApi.getMyPageData(false);
    } catch (error) {
        if (error.response.status == 401) {
            console.error("Failed get user data, Caused by Authentication");
            console.log(userData.value);
        }
    }
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

    width: 250px

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
        justify-content: space-between
        align-items: center
        gap: 5px

        p
            font-size: 0.8rem

        .switch
            width: 40px
            height: 20px

.sign-up-msg
    width: 100%

    h1
        font-size: 1rem
        margin-bottom: 7px

.account-button
    width: 100%
</style>
