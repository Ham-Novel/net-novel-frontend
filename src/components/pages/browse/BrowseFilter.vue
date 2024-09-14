<template>
    <section class="novel-filter">
        <div class="filter-header">
            <h1>Filter By</h1>
            <div class="line"></div>
        </div>
        <div class="filter-item-list">
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
            <input
                class="filter-input"
                type="text"
                placeholder="태그를 입력하고 enter를 누르십시오."
                v-model="inputTag"
                @keyup.enter="searchTag"
            />
        </div>
    </section>
</template>

<script setup>
import { tagApi } from "@/hooks/backendApi";
import { computed, ref, watch } from "vue";

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

const searchTag = async () => {
    const targetTag = await loadInputTag();

    //태그 메뉴에 없으면 추가
    if (!existInMenu(targetTag.id)) {
        tagMenuList.value.push(targetTag);
        checkedTags.value.push(targetTag.id);
        emits("filter");
        return;
    }

    //태그 메뉴에 있지만 체크 상태가 아니면 체크
    if (!existInChecked(targetTag.id)) {
        checkedTags.value.push(targetTag.id);
        emits("filter");
        return;
    }

    //이미 태그 메뉴가 있고 체크까지 되어 있으면 아무것도 안함
};

const loadInputTag = async () => {
    const browseName = inputTag.value;
    inputTag.value = "";

    const loadTag = await tagApi.getTagByName(browseName);
    console.debug("[BROWSE] load tag: ", loadTag);
    return loadTag;
};

const existInMenu = (tagId) => tagMenuList.value.some((menu) => menu.id === tagId);

const existInChecked = (tagId) => checkedTags.value.some((checkedId) => checkedId === tagId);
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
    width: 250px
    padding: 4px 8px
    border: 2px solid var(--line-color)
    border-radius: 12px
    font-size: 12px

.line
    border-top: 5px solid var(--primary-color)
    border-radius: 5px
    margin: 10px 0px
</style>
