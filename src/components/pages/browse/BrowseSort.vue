<template>
    <section class="novel-sort">
        <div class="sort-header">
            <h1>Sort By</h1>
            <div class="line"></div>
        </div>
        <div class="sort-item-list">
            <template v-for="sort in sortList">
                <label class="sort-item" :for="`sort-${sort.value}`" @change="emits('sort')">
                    <input
                        type="radio"
                        :id="`sort-${sort.value}`"
                        v-model="selected"
                        :value="sort.value"
                    />
                    <span>{{ sort.name }}</span>
                </label>
            </template>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";

const emits = defineEmits(["sort"]);
const selected = defineModel({ default: "latest" });

const sortList = ref([
    { name: "최신순", value: "latest" },
    { name: "추천순", value: "favorites" },
    { name: "선작순", value: "view" },
]);
</script>

<style scoped lang="sass">

.novel-sort
    border-radius: 30px
    border: 5px solid var(--bg-sub)

.sort-header
    margin-bottom: 20px

    h1
        font-size: 18px
        font-weight: 700

.sort-item-list
    margin: 0 10px
    display: flex
    flex-flow: row wrap
    gap: 10px

    .sort-item
        border: 2px solid var(--line-color)
        border-radius: 12px
        cursor: pointer

        input
            display: none

        span
            padding: 4px 8px
            font-size: 12px

        &:hover
            background-color: var(--bg-sub)

        &:has(input:checked)
            background-color: var(--bg-sub)

.line
    border-top: 5px solid var(--primary-color)
    border-radius: 5px
    margin: 10px 0px
</style>
