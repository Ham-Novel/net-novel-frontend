<template>
    <div class="login-container">
        <div class="login-box">
            <div class="logo">
                <Waypoints size="30"></Waypoints>
            </div>
            <div class="login-msg">
                <h1>Welcome to Netnovel</h1>
                <p>Access tons of novels and comics by a single tap</p>
            </div>
            <div class="sns-list">
                <NaverLoginButton
                    @click="loginSns('oauth2/authorization/naver')"
                ></NaverLoginButton>
                <GoogleLoginButton></GoogleLoginButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import NaverLoginButton from "./NaverLoginButton.vue";
import GoogleLoginButton from "./GoogleLoginButton.vue";
import { Waypoints } from "lucide-vue-next";

const loginSns = (authUrl) => {
    const doamin = "http://localhost:8081/";
    window.location.href = doamin + authUrl;
};
</script>

<style scoped lang="sass">
.login-container
    height: 80vh
    display: flex
    justify-content: center
    align-items: center

.login-box
    width: 350px
    padding: 0px 10px
    padding-bottom: 50px
    background-color: var(--bg-sub)
    border: 1px solid #dadada

    .logo
        padding-top: 40px
        padding-bottom: 10px
        display: flex
        justify-content: center
        align-items: center

    .login-msg
        text-align: center
        margin-bottom: 40px

        h1
            font-size: 18px
            font-weight: 700
            margin-bottom: 10px

        p
            font-size: 14px

    .sns-list
        width: 90%
        margin: 0 auto
        display: flex
        flex-flow: column wrap
        gap: 10px
</style>
