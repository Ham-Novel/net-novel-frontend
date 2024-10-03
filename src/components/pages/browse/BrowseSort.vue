<template>
    <article>
        <section class="novel-sort">
            <div class="sort-header">
                <h3>Sort By</h3>
                <div class="line"></div>
            </div>
        </section>
        <section class="sort-item-list">
            <template v-for="sort in sortList">
                <label class="sort-item" :for="`sort-${sort.value}`" @change="emits('sort')">
                    <input
                        type="radio"
                        :id="`sort-${sort.value}`"
                        v-model="searchSort"
                        :value="sort.value"
                    />
                    <span>{{ sort.name }}</span>
                </label>
            </template>
        </section>
    </article>
</template>

<script setup>
import { ref } from "vue";
import { useBrowseTagStore } from "./browseTagStore";
import { storeToRefs } from "pinia";

const browseTagStore = useBrowseTagStore();
const { searchSort } = storeToRefs(browseTagStore);

const emits = defineEmits(["sort"]);

const sortList = ref([
    { name: "최신순", value: "latest" },
    { name: "추천순", value: "favorites" },
    { name: "선작순", value: "view" },
]);
</script>

<style scoped lang="sass">
.sort-header
    margin-bottom: 20px
    margin-bottom: 20px

    .line
        border-top: 5px solid var(--pico-secondary)
        border-radius: 5px
        margin: 10px 0px
        width: 10rem

.sort-item-list
    margin: 0 10px
    display: flex
    flex-flow: row wrap
    gap: 10px

    .sort-item
        cursor: pointer
        border-radius: 0.5rem
        border: 2px solid var(--pico-secondary)

        display: flex
        align-items: center

        input
            display: none

        span
            padding: 4px 8px
            font-size: 0.6rem
            font-weight: bold

        &:has(input:checked)
            background-color: var(--pico-contrast-focus)
</style>
