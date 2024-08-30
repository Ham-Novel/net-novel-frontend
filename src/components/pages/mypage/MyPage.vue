<template>
    <section class="profile base-distance">
        <div class="profile-header base-wrapper">
            <div class="background"></div>
            <img class="img" />
            <button class="profile-edit-button">EDIT PROFILE</button>
        </div>

        <div class="profile-info base-wrapper">
            <h1>{{ userData.nickName }}</h1>
            <p class="id">ID: 4319251275</p>

            <div class="meta">
                <span>2021-11-20 Joined</span>
                <span>Global</span>
            </div>
        </div>
    </section>

    <section class="user-stats base-wrapper base-distance">
        <div class="stat">
            <span class="value">0.3h</span>
            <span class="label">of Reading</span>
        </div>
        <div class="stat">
            <span class="value">35</span>
            <span class="label">Read books</span>
        </div>
    </section>

    <section class="user-info base-wrapper base-distance">
        <h2 class="title">User Information</h2>
        <p class="data"><strong>Email:</strong> {{ userData.email }}</p>
        <p class="data"><strong>Coin:</strong> {{ userData.coinCount }}</p>
    </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { memberApi } from "@/hooks/backendApi";

const userData = ref({
    nickName: "nickName",
    coinCount: 0,
    email: "idValue@email.com",
});

async function loadUserData() {
    memberApi.getMyPageData().then((resp) => {
        console.log(resp);
        userData.value = resp;
    });
}

onMounted(() => {
    loadUserData();
});
</script>

<style lang="sass" scoped>
@use "@/assets/base.sass"


.profile
    position: relative
    background-color: rgb(247, 251, 255)
    padding-bottom: 20px

.profile-header
    position: relative
    height: 400px

    .background
        height: 85%
        background-color: #6495ed

    .img
        position: absolute
        bottom: 0
        left: 3%
        width: 150px
        height: 150px
        background-color: #3498db
        border-radius: 50%
        border: 6px solid white


.profile-edit-button
    position: absolute
    right: 3%
    bottom: 0
    height: 30px
    padding: 0 15px
    background: none
    border: none
    border-radius: 20px
    line-height: 30px
    letter-spacing: 1.5px
    background-color: #e6e6fa
    cursor: pointer


.profile-info
    position: relative
    left: 2%

    h1
        font-size: 40px

    .id
        font-size: 16px
        color: #666
        margin-bottom: 16px

    .meta
        font-size: 16px
        color: #666


.user-stats
    display: flex
    justify-content: space-around
    background-color: #f9f9f9
    padding: 15px
    border-radius: 10px

.stat
    display: flex
    flex-direction: column
    align-items: center

    .value
        font-size: 18px
        font-weight: bold

    .label
        font-size: 14px
        color: #666

.user-info
    .title
        font-size: 25px
        margin-bottom: 10px
</style>
