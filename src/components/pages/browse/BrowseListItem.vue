<template>
    <ListItem
        class="browse-item"
        :cover-img="novel.thumbnailUrl"
        :link="{ name: 'novel', params: { id: props.novel.id } }"
    >
        <div class="header">
            <h5 class="title">{{ novel.title }}</h5>
            <p class="author">
                <PencilLine size="17" stroke-width="2.3" />
                {{ props.novel.authorName }}
            </p>
        </div>
        <div class="detailed">
            <p class="stats">
                <span> <Eye size="16" /> {{ props.novel.totalView }} </span>
                <span>
                    <Heart size="16" />
                    {{ props.novel.totalFavorites }}
                </span>
                <span>
                    <Clock8 size="16" />
                    {{ formatUtil.formatRealTime(props.novel.latestUpdateAt) }}
                </span>
            </p>
            <div class="tag" v-if="props.novel.tags.length !== 0">
                <template v-for="tag in props.novel.tags" :key="tag.id">
                    <Tag :tag="tag"></Tag>
                </template>
            </div>
            <blockquote class="desc">
                {{ props.novel.description }}
            </blockquote>
        </div>
    </ListItem>
</template>

<script setup>
import ListItem from "@/components/reusable/novel/ListItem.vue";
import Tag from "@/components/reusable/Tag.vue";
import { Eye, Heart, Clock8, PencilLine } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { formatUtil } from "@/hooks/format";
import { onMounted } from "vue";

const props = defineProps({
    novel: {
        type: Object,
        required: true,
    },
});

console.log(props.novel);

const router = useRouter();
const browseTag = (tagId) => {
    router.push({ name: "browse", query: { tags: tagId } });
};
</script>

<style scoped lang="sass">
.browse-item
    height: 180px


.header
    display: flex
    flex-flow: row wrap
    align-items: flex-end
    gap: 6px

    .title
        max-width: 40%
        overflow: hidden
        text-overflow: ellipsis

    .author
        font-size: 0.7rem
        font-weight: 700
        display: inline-flex
        align-items: center
        gap: 2px

.detailed
    font-size: 14px

    margin-top: 10px
    display: flex
    flex-flow: column wrap
    gap: 4px


    .stats
        display: flex
        flex-flow: row wrap
        gap: 10px

        span
            flex-shrink: 0
            display: flex
            align-items: center
            gap: 1px

    .tag
        width: 500px
        height: 30px

        overflow: hidden

        display: flex
        flex-flow: row wrap
        align-items: center
        gap: 8px

        button
            padding: 0


    .desc
        max-width: 80%
        margin: 0
        padding: 0.1em 0.5em

        white-space: normal
        word-wrap: break-word
        overflow-wrap: break-word

        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 3 /* 표시할 줄 수 */
        -webkit-box-orient: vertical
</style>
