<template>
    <ListItem v-bind="itemProps">
        <div class="composition">
            <section class="zone">
                <StatSect></StatSect>
            </section>
            <section class="zone">
                <NovelSect></NovelSect>
            </section>
            <section class="zone">
                <EpisodeSect></EpisodeSect>
            </section>
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

provide("novel", props.novel);

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
        padding: 15px
        border-radius: 10px
        background-color: var(--bg-sub)
</style>
