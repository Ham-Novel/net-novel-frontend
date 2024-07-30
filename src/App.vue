<template>
    <Header></Header>
    <Nav></Nav>
    <main>
        <NovelMain></NovelMain>
    </main>
    <Footer></Footer>
</template>

<script setup>
import Header from "./components/header/Header.vue";
import Nav from "./components/header/Nav.vue";
import Footer from "./components/footer/Footer.vue";
import NovelMain from "./components/novel/NovelMain.vue";
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

html {
    font-family: sans-serif;
}

main {
    width: 800px;
    margin: 0 auto;
}
</style>
