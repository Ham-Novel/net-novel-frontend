<template>
    <section>
        <ul class="tab-list">
            <template v-for="(tab, index) in props.tabs">
                <li class="tab-item" @click="toggleTab(tab.component)">
                    {{ tab.name }}
                </li>
                <li
                    class="tab-divider"
                    v-if="index < props.tabs.length - 1"
                ></li>
            </template>
        </ul>
        <slot :activeTab="activeTab"></slot>
    </section>
</template>

<script setup>
import { ref, onMounted, markRaw } from "vue";

// 상위 컴포넌트에서 받은 tab 요소 data 받기
const props = defineProps(["tabs"]);

//활성화된 tab 결정하는 코드
const activeTab = ref(props.tabs[0].component);
function toggleTab(component) {
    activeTab.value = component;
}
</script>

<style lang="sass" scoped>

.tab-list
    display: flex
    align-items: center
    list-style-type: none
    font-size: 30px

    li.tab-item
        padding: 10px
        cursor: pointer
        font-weight: bold

    li.tab-divider
        height: 0.8em
        margin: 0 .6em
        border-left: 2px solid #b7b7b7
</style>
