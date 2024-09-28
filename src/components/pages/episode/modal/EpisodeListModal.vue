<template>
    <dialog open class="list-view">
        <article>
            <h1>에피소드 목록</h1>
        </article>
    </dialog>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { commentApi } from "@/hooks/backendApi";

onMounted(() => {
    document.body.style.overflow = "hidden";
});
onUnmounted(() => {
    document.body.style.overflow = "";
});
</script>

<style lang="sass" scoped>
article
    max-height: 90%
    overflow-y: scroll
</style>
