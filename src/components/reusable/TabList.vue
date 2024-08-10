<template>
    <figure>
        <form class="tab-menu base-wrapper">
            <template v-for="(tab, index) in props.tabs" :key="index">
                <label :for="tab.name">
                    <input
                        type="radio"
                        :id="tab.name"
                        name="tab-select"
                        @click="toggleTab(tab.component)"
                        :checked="tab.component === props.modelValue"
                    />
                    <span>{{ tab.name }}</span>
                </label>
                <div
                    class="tab-divider"
                    v-if="index < props.tabs.length - 1"
                ></div>
            </template>
        </form>
    </figure>
</template>

<script setup>
import { ref, onMounted, markRaw } from "vue";

// 상위 컴포넌트에서 받은 tab 요소 data 받기
const props = defineProps(["tabs", "modelValue"]);
const emits = defineEmits(["update:modelValue"]);

//활성화된 tab 결정하는 코드
function toggleTab(component) {
    emits("update:modelValue", component);
}
</script>

<style lang="sass" scoped>
@use "@/assets/base.sass"

.tab-menu
    display: flex
    align-items: center
    list-style-type: none
    font-size: 25px

    label
        padding: 10px
        cursor: pointer
        font-weight: bold
        transition: all 0.2s ease
        &:hover
            transform: translate(0, -5px)

    input
        display: none

        &:checked + span
            color: #7048fe

    .tab-divider
        height: 0.8em
        margin: 0 .6em
        border-left: 2px solid #b7b7b7
</style>
