<template>
    <section class="profile-header base-wrapper">
        <div class="background"></div>
        <img class="img" />
        <!-- <button class="profile-edit-button">EDIT PROFILE</button>/ -->
    </section>
    <section class="profile-info base-wrapper">
        <h1>{{ props.nickName }}</h1>
        <p class="id">ID: 4319251275</p>
        <p class="id">Email: {{ props.email }}</p>
        <p class="id">Coins: {{ props.coins }}개</p>
    </section>
    <slot></slot>
</template>

<script setup>
const props = defineProps({
    nickName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    coins: {
        type: Number,
        required: true,
    },
});
</script>

<style lang="sass" scoped>
@use "@/assets/base.sass"

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


.profile-info
    position: relative
    left: 2%

    h1
        font-size: 40px

    .id
        font-size: 16px
        color: #666
        margin-top: 5px

    .meta
        font-size: 16px
        color: #666

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
</style>
