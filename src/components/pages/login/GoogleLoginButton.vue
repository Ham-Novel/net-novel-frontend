<template>
    <button class="login-button">
        <GoogleLogo />
        <span>LOG IN WITH GOOGLE</span>
        <div></div>
    </button>
</template>

<script setup>
import GoogleLogo from "./GoogleLogo.vue";
</script>

<style scoped lang="sass">

.login-button
        width: 100%
        height: 40px
        padding: 14px
        border: none
        border-radius: 30px
        background-color: white
        font-weight: bold
        cursor: pointer

        display: flex
        align-items: center
        justify-content: space-between

        &:hover
            background-color: #eee

        div
            width: 25px

        span
            font-size: 14px
            font-weight: 700
            color: black
</style>
