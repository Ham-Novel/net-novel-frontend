<template>
    <ul>
        <li v-for="(item, index) in props.menuList" :key="index">
            <router-link class="menu" :to="item.link">
                <component :is="item.icon" size="28" stroke-width="2.5"></component>
            </router-link>
        </li>
    </ul>
</template>

<script setup>
import { Icon } from "lucide-vue-next";

const props = defineProps(["menuList"]);
</script>

<style scoped lang="sass">
ul
    margin-top: 5px

    display: inline-flex
    justify-content: center
    list-style-type: none
    gap: 20px

.menu
    color: var(--text-basic)
    cursor: pointer
    text-decoration: none

    transition: all 0.3s

    &:hover
        color: var(--primary-color)
</style>
