<template>
    <button @click="toggleState">
        <div class="container" :class="{ 'toggle-on': toggleOn }">
            <div class="switch" :class="{ 'toggle-on': toggleOn }">
                <div></div>
            </div>
        </div>
    </button>
</template>

<script setup>
import { ref } from "vue";

const toggleOn = defineModel("toggleOn");

const toggleState = () => {
    toggleOn.value = !toggleOn.value;
};
</script>

<style scoped lang="sass">
button
    position: relative
    width: 60px
    aspect-ratio: 2 / 1
    background-color: transparent
    border: none
    cursor: pointer

.container
    width: 100%
    height: 100%
    border-radius: 25% / 50%
    background-color: var(--bg-dark)
    transition: 0.3s

    display: flex
    align-items: center

    &.toggle-on
        background-color: var(--accent-color)

.switch
    position: relative
    width: 50%
    padding: 7%
    transition: 0.3s

    &.toggle-on
        transform: translateX(100%)

    div
        aspect-ratio: 1 / 1
        border-radius: 50%
        background-color: var(--bg-main)
</style>
