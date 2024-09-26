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
import { computed, ref, watch } from "vue";

const props = defineProps({
    //true이면 모든 input을 read only 설정
    disabled: {
        type: Boolean,
        default: false,
    },
});
const tags = defineModel({
    default: [],
});

const tagText = computed({
    get: () => tags.value.join(" "),
    set: (value) => (tags.value = value.split(" ")),
});
</script>

<style scoped lang="sass">

input[type=text]
        height: 60px
</style>
