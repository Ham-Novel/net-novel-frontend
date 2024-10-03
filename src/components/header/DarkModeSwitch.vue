<template>
    <input
        class="dark-move-switch"
        type="checkbox"
        id="dark-mode-switch"
        role="switch"
        v-model="isDarkMode"
    />
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useDarkModeStore } from "@/stores/darkModeStore";

const darkModeStore = useDarkModeStore();

const isDarkMode = computed({
    get: () => darkModeStore.isDarkMode,
    set: (value) => (darkModeStore.isDarkMode = value),
});
</script>

<style scoped lang="sass">
.dark-mode-switch
    transition: 0.3s
</style>
