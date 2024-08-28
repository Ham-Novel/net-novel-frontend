<template>
    <Nav v-if="navActivate"></Nav>
    <main>
        <router-view></router-view>
    </main>
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
*
    margin: 0
    padding: 0
    box-sizing: border-box

html
    font-family: sans-serif


body
    overflow-y: scroll


main
    min-height: 800px

span
    display: inline-block

// primary: #4f46e5
// sub: #212121, #f5f6fc
// background: #f5f8fa
</style>
