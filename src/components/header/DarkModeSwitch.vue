<template>
    <ToggleSwitch v-model:toggle-on="isDarkMode">
        <template #default> <Sun size="18" /> </template>
        <template #toggle-on> <Moon size="18" /> </template>
    </ToggleSwitch>
</template>

<script setup>
import ToggleSwitch from "../reusable/ToggleSwitch.vue";
import { Sun, Moon } from "lucide-vue-next";
import { computed, ref, watch } from "vue";
import { useDarkModeStore } from "@/stores/darkModeStore";

const darkModeStore = useDarkModeStore();

const isDarkMode = computed({
    get: () => darkModeStore.isActivate,
    set: (value) => darkModeStore.set(value),
});

watch(
    () => darkModeStore.isActivate,
    (newMode) => setDarkMode(newMode)
);

function setDarkMode(mode) {
    if (mode) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}
</script>
