<template>
    <ToggleSwitch v-model:toggle-on="mode">
        <template #default> <span>작품</span> </template>
        <template #toggle-on> <span>작가</span> </template>
    </ToggleSwitch>
</template>

<script setup>
import ToggleSwitch from "@/components/reusable/ToggleSwitch.vue";
import { ref } from "vue";

const mode = ref(false);
</script>

<style scoped lang="sass">
span
    font-size: 10px
</style>
