<template>
    <nav v-if="navBarStore.isDisplayed">
        <MenuGroup class="menu-group" :menu-list="publicList"></MenuGroup>
        <DarkModeSwitch></DarkModeSwitch>
        <MenuGroup class="menu-group" :menu-list="privateList"></MenuGroup>
    </nav>
</template>

<script setup>
import DarkModeSwitch from "./DarkModeSwitch.vue";
import MenuGroup from "./MenuGroup.vue";
import {
    Search,
    SquareLibrary,
    User,
    SquarePen,
    BarChart,
    Compass,
    Bell,
    Waypoints,
} from "lucide-vue-next";

import { ref, toRaw } from "vue";
import { useNavBarStore } from "@/stores/navBarStore";

const navBarStore = useNavBarStore();

const publicList = ref([
    {
        name: "home",
        icon: toRaw(Waypoints),
        link: { name: "home" },
    },
    {
        name: "browse",
        icon: toRaw(Compass),
        link: { name: "browse" },
    },
    {
        name: "ranking",
        icon: toRaw(BarChart),
        link: { name: "ranking" },
    },
    {
        name: "search",
        icon: toRaw(Search),
        link: { name: "search" },
    },
]);

const privateList = ref([
    {
        name: "alram",
        icon: toRaw(Bell),
        link: { name: "test" },
    },
    {
        name: "studio",
        icon: toRaw(SquarePen),
        link: { name: "work-manage" },
    },
    {
        name: "library",
        icon: toRaw(SquareLibrary),
        link: { name: "library" },
    },
    {
        name: "mypage",
        icon: toRaw(User),
        link: { name: "mypage" },
    },
]);
</script>

<style scoped lang="sass">
nav
    position: sticky
    top: 0
    left: 0
    -webkit-transform: translateZ(0)
    z-index: 100

    width: 100%
    height: 70px
    padding: 0 20px

    background-color: var(--pico-background-color)
    border-bottom: 1px solid var(--pico-muted-border-color)
    box-shadow: var(--pico-box-shadow)

    display: flex
    justify-content: space-between
    align-items: center
</style>
