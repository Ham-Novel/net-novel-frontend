<template>
    <ListItem
        class="browse-item"
        :brief="{
            title: props.novel.title,
            coverImg: props.novel.thumbnailUrl,
        }"
        :link="{ name: 'novel', params: { id: props.novel.id } }"
    >
        <div class="detailed">
            <p class="author">
                <PencilLine size="17" stroke-width="2.3" />
                {{ props.novel.authorName }}
            </p>
            <p class="stats">
                <span> <Eye size="15" /> {{ props.novel.totalView }} </span>
                <span>
                    <Heart size="15" />
                    {{ props.novel.totalFavorites }}
                </span>
                <span>
                    <Clock8 size="15" />
                    {{ formatUtil.formatRealTime(props.novel.latestUpdateAt) }}
                </span>
            </p>
            <div class="tag" v-if="props.novel.tags.length !== 0">
                <template v-for="tag in props.novel.tags" :key="tag.id">
                    <Tag :tag="tag"></Tag>
                </template>
            </div>
            <blockquote class="desc">
                {{ props.novel.desc }}
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

const props = defineProps({
    novel: {
        type: Object,
        required: true,
    },
});

const router = useRouter();
const browseTag = (tagId) => {
    router.push({ name: "browse", query: { tags: tagId } });
};
</script>

<style scoped lang="sass">
.browse-item
    height: auto

.detailed
    font-size: 14px

    margin-top: 10px
    display: flex
    flex-flow: column wrap
    gap: 6px

    .author
        font-size: 13px
        font-weight: 700
        display: flex
        align-items: center
        gap: 2px


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

        overflow: hidden

        display: flex
        flex-flow: row wrap
        align-items: center
        gap: 8px

        button
            font-size: 12px


    .desc
        max-width: 80%
        margin: 0
        padding: 0
        padding: 0.2em 0.6em

        white-space: normal
        word-wrap: break-word
        overflow-wrap: break-word

        height: 70px
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 3 /* 표시할 줄 수 */
        -webkit-box-orient: vertical
</style>
