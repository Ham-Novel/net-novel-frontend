<template>
    <Header></Header>
    <Nav></Nav>
    <main id="main_container">
        <TodayTop></TodayTop>
        <Recommend></Recommend>
        <RecentUpdated></RecentUpdated>
    </main>
    <Footer></Footer>
</template>

<script>
import Header from "./components/header/Header.vue";
import Nav from "./components/header/Nav.vue";
import TodayTop from "./components/section/TodayTop.vue";
import Recommend from "./components/section/Recommend.vue";
import RecentUpdated from "./components/section/RecentUpdated.vue";
import Footer from "./components/footer/Footer.vue";

export default {
    components: {
        Header,
        Nav,
        TodayTop,
        Recommend,
        RecentUpdated,
        Footer,
    },
};
</script>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    font-family: sans-serif;
}
</style>
