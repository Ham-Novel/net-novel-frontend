<template>
    <Nav></Nav>
    <router-view></router-view>
    <Footer></Footer>
</template>

<script setup>
import Nav from "./components/header/Nav.vue";
import Footer from "./components/footer/Footer.vue";
import { useDarkMode } from "./hooks/darkMode";
import { useAlram } from "./hooks/alram";

const alram = useAlram();
alram.connectSSE();
useDarkMode(); //다크 모드 자동화 전역 설정
</script>

<style lang="sass">
@use "@picocss/pico"

*
    // margin: 0
    // padding: 0
    box-sizing: border-box

h1, h2, h3, h4, h5, h6, p
    margin: 0
    --pico-color: var(--pico-h1-color)

article
    margin-bottom: 0

button
    padding: 0.2em 0.5em
    font-size: 16px
    font-weight: 700
    border-width: 2px

body
    overflow-x: hidden
    overflow-y: scroll


main
    min-height: 800px

// span
//     display: inline-block
</style>
