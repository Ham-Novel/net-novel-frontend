<template>
    <section>
        <ul id="tab-list">
            <li v-for="tab in props.tabs" @click="toggleTab(tab.component)">
                {{ tab.name }}
            </li>
        </ul>
        <slot :activeTab="activeTab"></slot>
    </section>
</template>

<script setup>
import { ref, onMounted, markRaw } from "vue";

// 상위 컴포넌트에서 받은 tab 요소 data 받기
const props = defineProps(["tabs"]);

//활성화된 tab 결정하는 코드
const activeTab = ref(EpiList);
function toggleTab(component) {
    activeTab.value = component;
}
</script>

<style scoped>
#tab-list {
    display: flex;
    list-style-type: none;
    margin-left: 20px;
    margin-bottom: 10px;
}

#tab-list li {
    padding: 5px 30px;
    cursor: pointer;
    border-right: 2px solid #ccc;
    font-size: 20px;
}

#tab-list li.active {
    border-bottom: 3px solid blue;
}
</style>
