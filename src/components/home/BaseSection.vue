<template>
    <section>
        <h2>
            <slot name="title"></slot>
        </h2>
        <slot></slot>
    </section>
</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped>
section {
    margin: 1rem 2.5rem;
}

h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.icon {
    margin-right: 0.5rem;
    color: #4f46e5;
}
</style>
