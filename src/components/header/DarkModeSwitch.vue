<template>
    <ToggleSwitch v-model:toggle-on="darkMode"></ToggleSwitch>
</template>

<script setup>
import { ref, watch } from "vue";
import ToggleSwitch from "../reusable/ToggleSwitch.vue";

const darkMode = ref(false);

const toggleDarkMode = watch(darkMode, (newValue) => {
    setDarkMode(newValue);
});

function setDarkMode(state) {
    console.log(state);
    darkMode.value = state;
    if (state) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}
</script>
