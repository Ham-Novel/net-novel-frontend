<template>
    <LibraryHeader></LibraryHeader>
    <TabView class="library-component"></TabView>
</template>

<script setup>
import LibraryHeader from "./LibraryHeader.vue";
import TabView from "@/components/reusable/TabView.vue";
import { ref } from "vue";
</script>

<style lang="sass" scoped>
@use "@/assets/base.sass"
</style>
