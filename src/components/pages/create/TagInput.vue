<template>
    <div>
        <p>해시 태그</p>
        <input
            type="text"
            v-model="tagText"
            @keydown.enter.prevent
            required
            :disabled="props.disabled"
        />
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    //true이면 모든 input을 read only 설정
    disabled: {
        type: Boolean,
        default: false,
    },
});
const tags = defineModel();

const tagText = ref("");
watch(tagText, (newText) => {
    tags.value = newText.split(" ");
});
</script>

<style scoped lang="sass">

input[type=text]
        height: 60px
</style>
