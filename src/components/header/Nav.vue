<template>
    <nav>
        <MenuGroup class="menu-group" :menu-list="publicList"></MenuGroup>
        <DarkModeSwitch></DarkModeSwitch>
        <MenuGroup class="menu-group" :menu-list="privateList"></MenuGroup>
    </nav>
    <div class="nav-margin"></div>
</template>

<script setup>
import MenuGroup from "./MenuGroup.vue";
import { Search, BookOpen, User, SquarePen, BarChart, Compass, Bell } from "lucide-vue-next";

import { ref, toRaw } from "vue";

const publicList = ref([
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
        link: { name: "studio" },
    },
    {
        name: "library",
        icon: toRaw(BookOpen),
        link: { name: "library" },
    },
    {
        name: "mypage",
        icon: toRaw(User),
        link: { name: "mypage" },
    },
]);

function toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle("dark-mode");
}
</script>

<style scoped lang="sass">

.nav-margin
    height: 70px

nav
    height: 70px
    padding: 0 20px

    // background-color: theme.$bg-color
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2)

    display: flex
    justify-content: space-between
    align-items: center

    position: fixed
    top: 0
    left: 0
    width: 100%
    z-index: 1000
</style>
