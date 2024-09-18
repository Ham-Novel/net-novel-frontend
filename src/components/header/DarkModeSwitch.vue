<template>
    <ToggleSwitch v-model:toggle-on="darkMode">
        <template #default> <Sun size="18" /> </template>
        <template #toggle-on> <Moon size="18" /> </template>
    </ToggleSwitch>
</template>

<script setup>
import ToggleSwitch from "../reusable/ToggleSwitch.vue";
import { Sun, Moon } from "lucide-vue-next";
import { ref, watch } from "vue";

const darkMode = ref(false);

const toggleDarkMode = watch(darkMode, (newValue) => {
    setDarkMode(newValue);
});

function setDarkMode(state) {
    darkMode.value = state;
    if (state) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}
</script>
