<template>
    <div class="checkbox-feature">
        <template v-for="item in props.list">
            <label :for="item.id">
                <input type="checkbox" :id="item.id" :value="item.value" :name="props.group" v-model="selected" />
                <span>{{ item.name }}</span>
            </label>
        </template>
    </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";

const props = defineProps(["modelValue", "list", "group"]);
const emits = defineEmits(["update:modelValue"]);
const selected = ref([]);

watch(selected, () => {
    emits("update:modelValue", [...selected.value]);
});
</script>

<style scoped lang="sass">
.checkbox-feature
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
