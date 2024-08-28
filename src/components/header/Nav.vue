<template>
    <nav>
        <ul>
            <li v-for="item in menuItems" :key="item">
                <router-link class="menu" :to="item.link">
                    {{ item.name }}
                </router-link>
            </li>
        </ul>
        <ul>
            <Search
                :size="32"
                color="white"
                @click="navTo({ name: 'search' })"
                class="menu"
            />
            <BookOpen
                :size="32"
                color="white"
                stroke-width="1.5"
                @click="navTo({ name: 'favorite' })"
                class="menu"
            />
            <User
                :size="30"
                color="white"
                @click="navTo({ name: 'mypage' })"
                class="menu"
            />
            <SquarePen
                :size="30"
                color="white"
                @click="navTo({ name: 'studio' })"
                class="menu"
            />
        </ul>
    </nav>
    <div class="nav-margin"></div>
</template>

<script setup>
import { ref } from "vue";
import { Search, BookOpen, User, SquarePen } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

const menuItems = ref([
    {
        name: "Browse",
        link: { name: "browse" },
    },
    {
        name: "Ranking",
        link: { name: "ranking" },
    },
    {
        name: "New",
        link: { name: "newWork" },
    },
]);

const navTo = (link) => {
    router.push(link);
};
</script>

<style scoped lang="sass">
.nav-margin
    height: 70px

nav
    display: flex
    justify-content: space-between
    background-color: #6159f7
    padding: 0 10px
    height: 70px
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
    align-items: center

    position: fixed
    top: 0
    left: 0
    width: 100%
    z-index: 1000

    ul
        display: inline-flex
        justify-content: center
        list-style-type: none
        gap: 1.5rem
        padding: 0

    .menu
        text-decoration: none
        color: white
        transition: color 0.3s
        cursor: pointer

        &:hover
            color: #818cf8
</style>
