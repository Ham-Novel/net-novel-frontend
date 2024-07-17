<template>
    <nav>
        <ul>
            <li v-for="item in menuItems" :key="item">
                <a href="#">{{ item }}</a>
            </li>
        </ul>
        <ul>
            <Search :size="32" color="white" />
            <BookOpen :size="32" color="white" stroke-width="1.5" />
            <User :size="30" color="white" />
        </ul>
    </nav>
</template>

<script setup>
import { ref } from "vue";
import { Search, BookOpen, User } from "lucide-vue-next";

const menuItems = ref(["Browse", "Ranking", "New"]);
</script>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    background-color: #4f46e5;
    padding: 0 10px;
    height: 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    align-items: center;
}

nav ul {
    display: inline-flex;
    justify-content: center;
    list-style-type: none;
    gap: 1.5rem;
    padding: 0;
}

nav a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
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
