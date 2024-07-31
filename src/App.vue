<template>
    <Header></Header>
    <Nav></Nav>
    <router-view></router-view>
    <Footer></Footer>
</template>

<script setup>
import Header from "./components/header/Header.vue";
import Nav from "./components/header/Nav.vue";
import Footer from "./components/footer/Footer.vue";
import NovelMain from "./components/novel/NovelMain.vue";
import myPage from "./components/mypage/MyPage.vue";
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-family: sans-serif;
}
</style>
