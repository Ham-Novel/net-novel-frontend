<template>
    <section class="base-wrapper base-distance">
        <div class="header">
            <slot name="header"></slot>
        </div>
        <div>
            <slot></slot>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped lang="sass">

.header
    padding-bottom: 15px
    margin-bottom: 25px
    border-bottom: 1px solid var(--line-color)
    font-size: 25px
    font-weight: 800
</style>
