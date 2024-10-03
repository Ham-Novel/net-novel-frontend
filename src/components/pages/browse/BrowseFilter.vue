<template>
    <article>
        <section class="filter-header">
            <h3>Filter By</h3>
            <div class="line"></div>
        </section>
        <section class="filter-item-list">
            <template v-for="menu in menuTags">
                <label class="filter-item" :for="`filter-${menu.id}`">
                    <input
                        type="checkbox"
                        :id="`filter-${menu.id}`"
                        v-model="browseTagStore.searchTags"
                        :value="menu.id"
                    />
                    <span>{{ menu.name }}</span>
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
        <button @click="emits('filter')">태그 검색</button>
        <button class="reset-button" @click="resetTag"><RotateCcw size="18" /></button>
    </article>
</template>

<script setup>
import { tagApi } from "@/hooks/backendApi";
import { RotateCcw } from "lucide-vue-next";

import { useBrowseTagStore } from "./browseTagStore";
import { onMounted, ref, watch, watchEffect } from "vue";
import { storeToRefs } from "pinia";

const emits = defineEmits(["filter"]);

const browseTagStore = useBrowseTagStore();
const { searchTags } = storeToRefs(browseTagStore);

/**
 * 태그 검색 초기화
 */
const resetTag = () => {
    browseTagStore.searchTags = [];
    menuTags.value.splice(5);
    emits("filter");
};

/**
 * 태그 checkbox 컴포넌트 기능
 */
const menuTags = ref([
    { id: 1, name: "판타지" },
    { id: 2, name: "무협" },
    { id: 3, name: "아카데미" },
    { id: 4, name: "헌터" },
    { id: 5, name: "아포칼립스" },
]);

//브라우즈 페이지에 진입 시
onMounted(() => {
    searchTags.value.forEach((tagId) => {
        if (checkInMenu(tagId)) return;
        addTagMenu(tagId);
    });
});

//태그 메뉴 선택 상태를 추적하여 메뉴 UI에 반영
watch(searchTags, (newList, oldList) => {
    const arr = newList.filter((tag) => !oldList.includes(tag));
    // console.log("search", browseTagStore.searchTags);
    // console.log("new", newList);
    // console.log("old", oldList);
    // console.log("changed", arr);

    arr.forEach((tagId) => {
        if (checkInMenu(tagId)) return;
        addTagMenu(tagId);
    });
});

//태그를 UI에 추가
const addTagMenu = async (tagId) => {
    try {
        const tag = await tagApi.getTagById(tagId);
        menuTags.value.push(tag);
    } catch (error) {
        console.error("Faild to add tag menu of search tag");
    }
};

//tag 메뉴가 있는지 확인
const checkInMenu = (tagId) => menuTags.value.some((menu) => menu.id === tagId);

/**
 * form에 입력해서 DB에 있는 태그를 checkbox에 추가하고 검색하는 메서드
 */
const inputTag = ref("");

//태그 추가 이벤트 실행
const browseTag = async () => {
    try {
        const tag = await loadInputTag();
        addSearchTag(tag);
    } catch (error) {
        console.error("Cannot Browse Tag", error.message);
    }
};

//input 입력 text로 태그 id 검색
const loadInputTag = async () => {
    const browseName = inputTag.value;
    inputTag.value = "";

    const loadTag = await tagApi.getTagByName(browseName);
    console.debug("[BROWSE] load tag: ", loadTag);
    return loadTag;
};

//검색할 태그로 설정
function addSearchTag(tag) {
    if (checkInSearch(tag)) {
        throw Error("Already included in search tags");
    }
    // searchTags.value.push(tag.id);
    searchTags.value = [...searchTags.value, tag.id];
}

//tag가 검색 목록에 포함되어 있는지 확인
const checkInSearch = (tag) => browseTagStore.searchTags.some((checkId) => checkId === tag.id);

/**
 * 태그 검색바 자동완성 기능
 */
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

article
    position: relative

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

.reset-button
    position: absolute
    top: 10px
    right: 10px
    padding: 5px

    display: flex
    justify-content: center
    align-items: center


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
