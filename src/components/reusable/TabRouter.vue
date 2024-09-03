<template>
    <section>
        <form class="tab-menu">
            <template v-for="(tab, index) in props.tabs" :key="index">
                <router-link class="tab-item" :to="toggleTab(tab.path) ?? {}">
                    {{ tab.name }}
                </router-link>
                <div class="tab-divider" v-if="index < props.tabs.length - 1"></div>
            </template>
        </form>
    </section>
</template>

<script setup>
import { ref, onMounted, markRaw } from "vue";

// 상위 컴포넌트에서 받은 tab 요소 data 받기
const props = defineProps({
    tabs: {
        type: Array,
        default: [
            { name: "탭1", path: { name: "test" } },
            { name: "탭2", path: { name: "test" } },
        ],
    },
});

//활성화된 tab 결정하는 코드
function toggleTab(path) {
    if (path.query?.scrollSave ?? false) {
        return path;
    }
    const newPath = { ...path };
    if (!(newPath.query ?? false)) {
        newPath.query = {};
    }
    newPath.query.scrollSave = true;
    return newPath;
}
</script>

<style lang="sass" scoped>
@use "@/assets/base.sass"

.tab-menu
    display: flex
    align-items: center
    list-style-type: none
    font-size: 25px

    .tab-item
        text-decoration: none
        color: black
        padding: 10px
        cursor: pointer
        font-weight: bold
        transition: all 0.2s ease
        &:hover
            transform: translate(0, -5px)

    .router-link-active
        color: #6159f7

    .tab-divider
        height: 0.8em
        margin: 0 .6em
        border-left: 2px solid #b7b7b7
</style>
