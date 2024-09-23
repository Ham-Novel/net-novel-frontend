<template>
    <Nav></Nav>
    <router-view></router-view>
    <Footer></Footer>
</template>

<script setup>
import Nav from "./components/header/Nav.vue";
import Footer from "./components/footer/Footer.vue";
import { useDarkMode } from "./hooks/darkMode";

useDarkMode(); //다크 모드 자동화 전역 설정
</script>

<style lang="sass">
@use "@picocss/pico"

// *
//     margin: 0
//     padding: 0
//     box-sizing: border-box

// html
//     font-family: 'Nanum Gothic', sans-serif


body
    // background-color: var(--bg-main)
    // color: var(--text-basic)
    overflow-y: scroll


main
    min-height: 800px

span
    display: inline-block
</style>
