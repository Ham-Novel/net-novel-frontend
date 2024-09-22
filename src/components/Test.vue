<template>
    <div>
        <SelectSwitch v-model:toggle-on="select"></SelectSwitch>
    </div>
</template>

<script setup>
import { ref } from "vue";
import SelectSwitch from "./reusable/switch/SelectSwitch.vue";

const select = ref(false);
</script>

<style scoped lang="sass"></style>
