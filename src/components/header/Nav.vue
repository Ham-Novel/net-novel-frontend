<template>
    <nav v-if="navBarStore.isDisplayed">
        <div class="nav-sort base-wrapper">
            <ul>
                <template v-for="(item, index) in postMenus" :key="item.name">
                    <Menu
                        :name="item.name"
                        :icon="item.icon"
                        :link="item.link"
                        :modal="item.modal"
                    ></Menu>
                </template>
            </ul>
            <ul>
                <template v-for="(item, index) in userMenus" :key="item.name">
                    <Menu
                        :name="item.name"
                        :icon="item.icon"
                        :link="item.link"
                        :modal="item.modal"
                    ></Menu>
                </template>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import Menu from "./Menu.vue";
import UserInfoModal from "./UserInfoModal.vue";
import AlramModal from "./AlramModal.vue";
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

import { reactive, ref, markRaw } from "vue";
import { useNavBarStore } from "@/stores/navBarStore";
import { useRouter } from "vue-router";

const navBarStore = useNavBarStore();

const router = useRouter();

const postMenus = ref([
    {
        name: "Home",
        icon: markRaw(Waypoints),
        link: { name: "home" },
    },
    {
        name: "Browse",
        icon: markRaw(Compass),
        link: { name: "browse" },
    },
    {
        name: "Ranking",
        icon: markRaw(BarChart),
        link: { name: "ranking" },
    },
    {
        name: "Search",
        icon: markRaw(Search),
        link: { name: "search" },
    },
]);

const userMenus = ref([
    {
        name: "Studio",
        icon: markRaw(SquarePen),
        link: { name: "work-manage" },
    },
    {
        name: "Library",
        icon: markRaw(SquareLibrary),
        link: { name: "library" },
    },
    {
        name: "",
        icon: markRaw(Bell),
        modal: markRaw(AlramModal),
    },
    {
        name: "",
        icon: markRaw(User),
        modal: markRaw(UserInfoModal),
    },
]);

const mypage = reactive({
    name: "MyPage",
    icon: markRaw(User),
    modal: markRaw(UserInfoModal),
    state: false,
    event() {
        this.state = !this.state;
    },
});
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
    padding: 0

    background-color: var(--pico-background-color)
    border-bottom: 1px solid var(--pico-muted-border-color)
    box-shadow: var(--pico-box-shadow)

.nav-sort
    display: flex
    justify-content: space-between
    align-items: center


ul
    display: inline-flex
    justify-content: center
    list-style-type: none
    gap: 10px

    li
        position: relative
        padding: 0

    button
        padding: 0.3rem
        border: none
        font-size: 0.9rem
        color: var(--pico-text-color)

        display: flex
        align-items: center
        gap: 3px

        &:hover
            color: var(--pico-primary)
</style>
