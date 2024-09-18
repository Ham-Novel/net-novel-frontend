<template>
    <BaseHomeSection>
        <template #header>
            <h2>
                <BookmarkCheck></BookmarkCheck>
                <span>Top Trend Tags</span>
            </h2>
        </template>
        <template #default>
            <div class="tag-list">
                <template v-for="tag in tagList">
                    <span class="tag" @click="browseTag(tag.id)">{{ tag.name }}</span>
                </template>
            </div>
        </template>
    </BaseHomeSection>
</template>

<script setup>
import { ref } from "vue";
import BaseHomeSection from "./BaseHomeSection.vue";

import { BookmarkCheck } from "lucide-vue-next";
import { useRouter } from "vue-router";

const tagList = ref([
    { id: 1, name: "태그1" },
    { id: 2, name: "태그2" },
    { id: 3, name: "태그3" },
    { id: 4, name: "태그4" },
    { id: 5, name: "태그5" },
    { id: 5, name: "태그5" },
    { id: 5, name: "태그5asdfaf" },
    { id: 5, name: "태그5" },
    { id: 5, name: "태그5" },
    { id: 5, name: "태그5" },
    { id: 5, name: "태그5" },
    { id: 10, name: "태그10" },
]);

//태그 클릭 시 태그 검색
const router = useRouter();
const browseTag = (tagId) => {
    router.push({ name: "browse", query: { tags: tagId } });
};
</script>

<style scoped lang="sass">

h2
    font-size: inherit
    display: flex
    align-items: center
    gap: 10px

.tag-list
    display: flex
    flex-flow: row wrap
    justify-content: center
    align-items: center
    gap: 30px

    .tag
        padding: 12px 12px
        box-shadow: 0 4px 12px rgba(0, 0, 0, .1)

        font-size: 16px
        font-weight: 800
        color: var(--primary-color)
        cursor: pointer
        transition-duration: 0.3s

        &:hover
            transform: translateY(-8px)
            box-shadow: 0 12px 28px rgba(0, 0, 0, .1)
</style>
