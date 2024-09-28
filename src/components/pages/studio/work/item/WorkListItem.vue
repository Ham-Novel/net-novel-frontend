<template>
    <ListItem
        :title="novel.title"
        :cover-img="novel.thumbnailUrl"
        :link="{ name: 'novel', params: { id: props.novel.id } }"
    >
        <div class="composition">
            <StatSect class="zone"></StatSect>
            <NovelSect class="zone"></NovelSect>
            <EpisodeSect class="zone"></EpisodeSect>
        </div>
    </ListItem>
</template>

<script setup>
import ListItem from "@/components/reusable/novel/ListItem.vue";
import StatSect from "./StatSect.vue";
import NovelSect from "./NovelSect.vue";
import EpisodeSect from "./EpisodeSect.vue";
import { provide } from "vue";

const props = defineProps({
    novel: {
        type: Object,
        required: true,
    },
});

//각 Sect에 작품 정보 전달
//props는 번거로우니 provide 사용
provide("novel", props.novel);

//ListItem에 작품 데이터 전달
const itemProps = {
    brief: {
        title: props.novel.title,
        coverImg: props.novel.thumbnailUrl,
    },
    link: { name: "novel", params: { id: props.novel.id } },
};
</script>

<style scoped lang="sass">

.composition
    margin-top: 20px
    height: 70%

    display: flex
    flex-flow: row wrap
    gap: 15px

    .zone
        flex: 1
        border-radius: 10px
</style>
