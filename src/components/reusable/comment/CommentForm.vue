<template>
    <form @submit.prevent="emits('submit')" role="group">
        <TextArea v-model="content" :aria-invalid="!valid"></TextArea>
        <input type="submit" class="submit" :value="buttonText" />
    </form>
</template>

<script setup>
import { ref, watch } from "vue";
import TextArea from "../TextArea.vue";

const props = defineProps({
    buttonText: {
        type: String,
        default: "제출",
    },
});

const emits = defineEmits(["submit"]);

const content = defineModel();

const valid = ref(true);
watch(content, (value) => {
    if (value.length > 300) {
        valid.value = false;
    } else {
        valid.value = true;
    }
});
</script>

<style scoped lang="sass">
form
    position: relative
    margin: 0

    display: flex
    align-items: stretch

    textarea
        height: auto
        font-size: 0.8rem

    input
        height: auto
        padding: 0 1rem
        font-size: 0.8rem
        display: flex
        align-items: center
</style>
