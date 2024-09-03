<template>
    <div class="radio-feature">
        <template v-for="radio in props.radioList">
            <label :for="radio.id">
                <input type="radio" :id="radio.id" :value="radio.value" :name="props.group" @input="selectValue" />
                <span>{{ radio.name }}</span>
            </label>
        </template>
    </div>
</template>

<script setup>
import { reactive } from "vue";

const props = defineProps(["modelValue", "radioList", "group"]);
const emits = defineEmits(["update:modelValue"]);

const selectValue = (event) => {
    emits("update:modelValue", event.target.value);
};
</script>

<style scoped lang="sass">
.radio-feature
    display: flex
    flex-direction: row
    justify-content: baseline
    gap: 12px

    label
        cursor: pointer

        input:checked + span
            font-weight: bold

        span
            margin-left: 2px
            font-size: 13px
</style>
