<template>
    <!-- <Header></Header> -->
    <Nav></Nav>
    <router-view></router-view>
    <Footer></Footer>
</template>

<script setup>
import Header from "./components/header/Header.vue";
import Nav from "./components/header/Nav.vue";
import Footer from "./components/footer/Footer.vue";
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

span {
    display: inline-block;
}

/* 
primary: #4f46e5;
sub: #212121, #f5f6fc;
background: #f5f8fa;
 */
</style>
