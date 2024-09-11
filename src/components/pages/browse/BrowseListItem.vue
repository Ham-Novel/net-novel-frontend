<template>
    <ListItem
        class="brows-item"
        :brief="{
            title: props.novel.title,
            coverImg: props.novel.thumbnailUrl,
        }"
        :link="{ name: 'novel', params: { id: props.novel.id } }"
    >
        <div class="detailed">
            <div class="tag">
                <span v-for="tag in props.novel.tags" :key="tag.id">#{{ tag.name }}</span>
            </div>
            <p class="desc">
                {{ props.novel.desc }}
            </p>
        </div>
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
.brows-item
    height: 150px

.detailed

    .tag
        margin-top: 15px
        width: 500px
        height: 20px

        overflow: hidden

        display: flex
        flex-flow: row wrap
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
        margin-top: 10px
        max-height: 80px
        font-size: 15px
        overflow: hidden
        overflow-wrap: break-word
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 3 /* 표시할 줄 수 */
        -webkit-box-orient: vertical
</style>
