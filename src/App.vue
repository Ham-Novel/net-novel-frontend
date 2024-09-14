<template>
    <Nav v-if="navActivate"></Nav>
    <router-view></router-view>
    <Footer></Footer>
</template>

<script setup>
import Nav from "./components/header/Nav.vue";
import Footer from "./components/footer/Footer.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

const store = useStore();

const navActivate = computed(() => {
    // console.log(store.state.navi.naviState);
    return store.state.navi.naviState;
});
</script>

<style lang="sass">
@use "@/assets/theme.sass"

*
    margin: 0
    padding: 0
    box-sizing: border-box

html
    font-family: 'Nanum Gothic', sans-serif


body
    background-color: var(--bg-main)
    color: var(--text-basic)
    overflow-y: scroll


main
    min-height: 800px

span
    display: inline-block
</style>
