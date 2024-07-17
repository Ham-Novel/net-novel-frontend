<template>
    <Header></Header>
    <Nav></Nav>
    <main id="main_container">
        <TodayTopSection></TodayTopSection>
        <!-- <RecommendSection></RecommendSection>
        <RecentUpdatedSection></RecentUpdatedSection> -->
    </main>
    <FooterComponent></FooterComponent>
</template>

<script>
import Header from "./components/header/Header.vue";
import Nav from "./components/header/Nav.vue";
import TodayTopSection from "./components/section/TodayTopSection.vue";
import RecommendSection from "./components/section/RecommendSection.vue";
import RecentUpdatedSection from "./components/section/RecentUpdatedSection.vue";
import FooterComponent from "./components/footer/FooterComponent.vue";

export default {
    components: {
        Header,
        Nav,
        TodayTopSection,
        RecommendSection,
        RecentUpdatedSection,
        FooterComponent,
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
