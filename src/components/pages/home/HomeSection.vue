<template>
    <section class="base-wrapper base-distance">
        <h2>
            <slot name="title"></slot>
        </h2>
        <slot></slot>
    </section>
</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"

h2
    margin: 20px 0
    font-size: 25px
    font-weight: 800

    display: flex
    align-items: center
    gap: 10px

.icon
    margin-right: 0.5rem
    color: #4f46e5
</style>
