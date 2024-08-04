<template>
    <nav>
        <ul>
            <li v-for="item in menuItems" :key="item">
                <a @click="navTo(item)">{{ item }}</a>
            </li>
        </ul>
        <ul>
            <Search :size="32" color="white" @click="navTo('search')" />
            <BookOpen
                :size="32"
                color="white"
                stroke-width="1.5"
                @click="navTo('library')"
            />
            <User :size="30" color="white" @click="navTo('mypage')" />
        </ul>
    </nav>
</template>

<script setup>
import { ref } from "vue";
import { Search, BookOpen, User } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

const menuItems = ref(["Browse", "Ranking", "New"]);

const navTo = (name) => {
    const link = name.toLowerCase().trim();
    console.log(link);
    router.push(`/${link}`);
};
</script>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    background-color: #6159f7;
    padding: 0 10px;
    height: 70px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
}

nav ul {
    display: inline-flex;
    justify-content: center;
    list-style-type: none;
    gap: 1.5rem;
    padding: 0;
}

nav > * {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
    cursor: pointer;
}

nav a:hover {
    color: #818cf8;
}

/*
li {
    margin: 0 2rem;
    color: white;
}
 */
</style>
