<template>
    <button>
        <div class="container" :class="{ 'toggle-on': toggleOn }">
            <div class="switch" :class="{ 'toggle-on': toggleOn }">
                <div class="lever" @click="toggleState"></div>
            </div>
            <div class="toggle-off-content" v-if="!toggleOn">
                <slot></slot>
            </div>
            <div class="toggle-on-content" v-if="toggleOn">
                <slot name="toggle-on"></slot>
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
    width: 50px
    aspect-ratio: 2 / 1
    background-color: transparent
    border: none

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

    .lever
        aspect-ratio: 1 / 1
        border-radius: 50%
        background-color: var(--bg-main)
        cursor: pointer

.toggle-off-content
    position: absolute
    right: 7%
    width: 50%
    display: flex
    justify-content: center
    align-items: center
    color: var(--bg-main)

.toggle-on-content
    position: absolute
    left: 7%
    width: 50%
    display: flex
    justify-content: center
    align-items: center
    color: var(--bg-main)
</style>
