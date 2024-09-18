<template>
    <div>
        <p>해시 태그</p>
        <input type="text" v-model="tagText" />
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

const tags = defineModel();

const tagText = ref("");
watch(tagText, (newText) => {
    tags.value = newText.split(" ");
});
</script>

<style scoped lang="sass">
p
    margin: 5px

input
        width: 100%
        height: 25px
</style>
