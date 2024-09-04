<template>
    <ListItem
        :brief="{
            title: props.novel.title,
            coverImg: props.novel.thumbnailUrl,
        }"
        :link="{ name: 'novel', params: { id: props.novel.id } }"
    >
        <div class="tag">
            <span v-for="tag in props.novel.tags" :key="tag.id">#{{ tag.name }}</span>
        </div>
        <p class="desc">
            {{ props.novel.desc }}
        </p>
    </ListItem>
</template>

<script setup>
import ListItem from "@/components/reusable/novel/ListItem.vue";

const props = defineProps({
    novel: {
        type: Object,
        required: true,
    },
});
</script>

<style scoped lang="sass">
.tag
    margin-bottom: 5px

    span
        margin-right: 8px
        font-size: 13px
        font-weight: bold
        color: blue
        cursor: pointer

        &:hover
            text-decoration: underline

.desc
    max-height: 80px
    font-size: 15px
    overflow: hidden
    overflow-wrap: break-word
    text-overflow: ellipsis
    display: -webkit-box
    -webkit-line-clamp: 3 /* 표시할 줄 수 */
    -webkit-box-orient: vertical
</style>
