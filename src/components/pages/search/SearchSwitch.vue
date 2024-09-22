<template>
    <ToggleSwitch v-model:toggle-on="state">
        <template #default> <span>작품</span> </template>
        <template #toggle-on> <span>작가</span> </template>
    </ToggleSwitch>
</template>

<script setup>
import ToggleSwitch from "@/components/reusable/ToggleSwitch.vue";
import { computed, ref, watch } from "vue";

const mode = defineModel();

const state = ref(false);

watch(state, (changed) => {
    mode.value = changed ? "author" : "title";
});
</script>

<style scoped lang="sass">
span
    font-size: 10px
</style>
