<template>
    <section class="novel-filter">
        <div class="filter-header">
            <h1>Filter By</h1>
            <div class="line"></div>
        </div>
        <div class="filter-item-list">
            <template v-for="tag in tags">
                <label class="filter-item" :for="'filter' + tag" @change="emits('filter')">
                    <input type="checkbox" :id="'filter' + tag" v-model="selected" :value="tag" />
                    <span>태그{{ tag }}</span>
                </label>
            </template>
            <input class="filter-input" type="text" value="태그 생성" />
        </div>
    </section>
</template>

<script setup>
import { ref, watch } from "vue";

const selected = defineModel({ default: [] });
const emits = defineEmits(["filter"]);

//todo: 내가 선택한 태그들을 불러오는 api
const tags = ref([1, 2, 3, 4, 5, 6, 7]);
</script>

<style scoped lang="sass">
.novel-filter
    border-radius: 30px
    border: 5px solid var(--bg-sub)

.filter-header
    margin-bottom: 20px

.filter-item-list
    margin: 0 10px
    display: flex
    flex-flow: row wrap
    gap: 10px

    .filter-item
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



.filter-input
    display: inline-block
    width: 100px
    padding: 4px 8px
    border: 2px solid var(--line-color)
    border-radius: 12px
    font-size: 12px

.line
    border-top: 5px solid var(--primary-color)
    border-radius: 5px
    margin: 10px 0px
</style>
