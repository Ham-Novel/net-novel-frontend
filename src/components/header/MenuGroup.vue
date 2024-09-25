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
    display: inline-flex
    justify-content: center
    list-style-type: none
    gap: 20px

.menu
    font-size: 25px
    transition: all 0.3s
</style>
