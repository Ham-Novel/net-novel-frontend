<template>
    <ListItem
        class="item"
        :title="novel.title"
        :cover-img="novel.thumbnailUrl"
        :link="{ name: 'novel', params: { id: novel.id } }"
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
            <p class="desc">
                {{ props.novel.desc }}
            </p>
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
        default: {
            id: 0,
            title: "ERROR",
            authorName: "error",
            desc: "Est aliqua aliqua veniam fugiat laboris non reprehenderit cillum consectetur fugiat sint sit aliquip minim. Do officia consectetur elit enim reprehenderit aute voluptate sunt sunt velit. Aliqua irure sint nisi nostrud in velit cillum culpa non laboris labore.",
            tags: [1, 2, 3],
            totalFavorites: 0,
            totalView: 0,
            latestUpdateAt: "",
            thumbnailUrl: "",
        },
    },
});

const router = useRouter();
const browseTag = (tagId) => {
    router.push({ name: "browse", query: { tags: tagId } });
};
</script>

<style scoped lang="sass">
.item
    height: 180px

.detailed
    margin-top: 8px
    display: flex
    flex-flow: column wrap
    gap: 6px

    .author
        font-size: 13px
        font-weight: 700
        color: var(--bg-dark)
        display: flex
        align-items: center
        gap: 2px


    .stats
        display: flex
        flex-flow: row wrap
        font-size: 12px
        gap: 10px

        span
            flex-shrink: 0
            display: flex
            align-items: center
            gap: 1px

    .tag
        width: 500px
        height: 20px

        overflow: hidden

        display: flex
        flex-flow: row wrap
        align-items: center
        gap: 8px


        span
            flex-shrink: 0
            color: var(--primary-color)
            font-size: 12px
            font-weight: bold
            cursor: pointer

            &:hover
                text-decoration: underline

    .desc
        max-height: 80px
        font-size: 14px
        overflow: hidden
        overflow-wrap: break-word
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 3 /* 표시할 줄 수 */
        -webkit-box-orient: vertical
        color: gray
</style>
