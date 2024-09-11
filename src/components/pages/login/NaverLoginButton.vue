<template>
    <button class="login-button">
        <NaverLogo />
        <span>LOG IN WITH NAVER</span>
        <div></div>
    </button>
</template>

<script setup>
import NaverLogo from "./NaverLogo.vue";
</script>

<style scoped lang="sass">

.login-button
        width: 100%
        height: 40px
        padding: 10px
        border: none
        border-radius: 30px
        background-color: #03c75a
        font-weight: bold
        cursor: pointer

        display: flex
        align-items: center
        justify-content: space-between

        &:hover
            background-color: #02b150

        div
            width: 30px

        span
            font-size: 14px
            font-weight: 700
            color: white
</style>
