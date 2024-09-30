<template>
    <article>
        <section class="filter-header">
            <h3>Filter By</h3>
            <div class="line"></div>
        </section>
        <section class="filter-item-list">
            <template v-for="tagMenu in tagMenuList">
                <label class="filter-item" :for="`filter-${tagMenu.id}`" @change="emits('filter')">
                    <input
                        type="checkbox"
                        :id="`filter-${tagMenu.id}`"
                        v-model="checkedTags"
                        :value="tagMenu.id"
                    />
                    <span>{{ tagMenu.name }}</span>
                </label>
            </template>
        </section>
        <section>
            <input
                class="filter-input"
                type="text"
                placeholder="태그를 입력하고 enter를 누르십시오."
                v-model="inputTag"
                @keyup.enter="browseTag"
                @keydown.tab.prevent="suggestTags"
                @input="suggestTags"
                @blur="resetSuggest"
            />
            <ul v-if="suggestions.length !== 0" class="input-suggestion">
                <li v-for="suggestion in suggestions" @mousedown="selectSuggestion(suggestion)">
                    {{ suggestion }}
                </li>
            </ul>
        </section>
    </article>
</template>

<script setup>
import { tagApi } from "@/hooks/backendApi";
import { ref, watch } from "vue";

const checkedTags = defineModel({ default: [] });
const emits = defineEmits(["filter"]);

//todo: 내가 선택한 태그들을 불러오는 api
const tagMenuList = ref([
    { id: 1, name: "태그1" },
    { id: 2, name: "태그2" },
    { id: 3, name: "태그3" },
    { id: 4, name: "태그4" },
    { id: 5, name: "태그5" },
]);

const inputTag = ref("");

watch(checkedTags, (v) => {
    console.log(v);
});

const browseTag = async () => {
    try {
        const targetTag = await loadInputTag();
        checkFilterItem(targetTag);
    } catch (error) {
        console.error("Cannot Browse Tag", error.message);
        alert("태그 검색 실패");
    }
};

//태그 검색
const loadInputTag = async () => {
    //태그 검색 실패 시 예외 처리
    const browseName = inputTag.value;
    inputTag.value = "";

    const loadTag = await tagApi.getTagByName(browseName);
    console.debug("[BROWSE] load tag: ", loadTag);
    return loadTag;
};

const checkFilterItem = (targetTag) => {
    //태그 메뉴에 없으면 추가
    if (!existInMenu(targetTag)) {
        tagMenuList.value.push(targetTag);
        checkedTags.value.push(targetTag.id);
        emits("filter");
        return;
    }

    //태그 메뉴에 있지만 체크 상태가 아니면 체크
    if (!existInChecked(targetTag)) {
        checkedTags.value.push(targetTag.id);
        emits("filter");
        return;
    }

    //이미 태그 메뉴가 있고 체크까지 되어 있으면 아무것도 안함
};

const existInMenu = (tag) => tagMenuList.value.some((menu) => menu.id === tag.id);

const existInChecked = (tag) => checkedTags.value.some((checkedId) => checkedId === tag.id);

//태그 검색바 자동완성 기능
const suggestions = ref([]);

const suggestTags = async () => {
    const tags = await tagApi.searchTag(inputTag.value);
    suggestions.value = tags;
};

const resetSuggest = () => {
    suggestions.value = [];
};

const selectSuggestion = (suggestion) => {
    inputTag.value = suggestion;
    resetSuggest();
};
</script>

<style scoped lang="sass">

section
    position: relative

.filter-header
    margin-bottom: 20px

    .line
        border-top: 5px solid var(--pico-secondary)
        border-radius: 5px
        margin: 10px 0px
        width: 10rem

.filter-item-list
    margin: 10px
    display: flex
    flex-flow: row wrap
    gap: 10px

    .filter-item
        cursor: pointer
        border-radius: 0.5rem
        border: 2px solid var(--pico-secondary)

        display: flex
        align-items: center

        span
            margin: 0
            padding: 4px 8px
            border-radius: 0.5rem
            font-size: 0.6rem
            font-weight: bold

        input
            display: none

        &:has(input:checked)
            background-color: var(--pico-contrast-focus)



.filter-input
    height: 40px
    display: inline-block
    font-size: 0.7rem
    margin: 0

ul.input-suggestion
    position: absolute
    width: 100%
    background-color: var(--pico-background-color)
    padding: 0

    border: 1px solid var(--pico-form-element-border-color)
    border-bottom-left-radius: 5px
    border-bottom-right-radius: 5px
    z-index: 1

    display: flex
    flex-flow: column wrap

    li
        padding: 10px 0 10px 20px
        list-style: none
        font-size: 0.7rem
        cursor: pointer

        &:hover
            background-color: var(--pico-form-element-background-color)
</style>
