<template>
    <main>
        <LibraryHeader></LibraryHeader>
        <TabView class="library-component"></TabView>
    </main>
</template>

<script setup>
import LibraryHeader from "./LibraryHeader.vue";
import TabView from "@/components/reusable/tab/TabView.vue";
import { ref } from "vue";
</script>

<style lang="sass" scoped>

</style>
