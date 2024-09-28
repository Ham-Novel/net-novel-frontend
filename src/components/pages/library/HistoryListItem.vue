<template>
    <ListItem
        class="browse-item"
        :title="novel.title"
        :cover-img="novel.thumbnailUrl"
        :link="{ name: 'novel', params: { id: novel.novelId } }"
    >
        <template #cover>
            <p class="type">{{ novelType }}</p>
        </template>
        <template #default>
            <div class="detail">
                <p class="author">
                    <PencilLine size="17" stroke-width="2.3" />
                    {{ props.novel.authorName }}
                </p>
                <p class="desc">{{ props.novel.novelDesc }}</p>
                <div class="tag">
                    <span v-for="tag in props.novel.tags" :key="tag.id" @click="browseTag(tag.id)"
                        >#{{ tag.name }}</span
                    >
                </div>
            </div>
            <div class="feature">
                <button class="continue-read" @click="goToRead(props.novel.episodeId)">
                    {{ props.novel.episodeTitle }} >>
                </button>
            </div>
            <p class="time">
                <Clock8 size="17" stroke-width="2.3" />
                {{ formatUtil.formatRealTime(props.novel.updatedAt) }}
            </p>
        </template>
    </ListItem>
</template>

<script setup>
import ListItem from "@/components/reusable/novel/ListItem.vue";
import { PencilLine, Clock8 } from "lucide-vue-next";

import { formatUtil } from "@/hooks/format";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    novel: {
        type: Object,
        required: true,
    },
});
const novelType = computed(() => {
    switch (props.novel.novelType) {
        case "ONGOING":
            return "연재중";
            break;
        case "GIVEUP":
            return "연중";
            break;
        default:
            return "알 수 없음";
    }
});

const router = useRouter();
function goToRead(episodeId) {
    router.push({ name: "episode", params: { episodeId } });
}
</script>

<style scoped lang="sass">
.item
    height: 150px
    gap: 15px

    :deep(.info)
        .title
            margin-bottom: 10px
            font-size: 24px
            font-weight: 700

.detail
    width: 70%
    display: flex
    flex-flow: column wrap
    gap: 10px

    > *
        font-size: 14px
        margin-left: 10px
        display: flex
        align-items: center
        gap: 5px

    .desc
        display: -webkit-box
        -webkit-line-clamp: 3
        -webkit-box-orient: vertical
        overflow: hidden
        text-overflow: ellipsis

    .tag
        overflow-x: hidden
        gap: 8px

        span
            flex-shrink: 0
            color: var(--primary-color)
            font-weight: 700
            cursor: pointer

            &:hover
                text-decoration: underline

.feature
    position: absolute
    bottom: 5px
    right: 10px
    display: flex
    flex-flow: row wrap
    gap: 30px

    .continue-read
        padding: 5px 10px
        border-radius: 15px
        border: none
        background-color: var(--bg-sub)
        cursor: pointer

    .add-library
        background: none
        border: none
        height: 35px
        padding: 0 25px
        border-radius: 20px
        background-color: #e6e6fa
        cursor: pointer

.time
    position: absolute
    top: 5px
    right: 10px

    font-size: 14px
    margin-left: 10px
    display: flex
    align-items: center
    gap: 5px


.type
    position: absolute
    top: 0
    left: 0

    display: inline-block
    padding: 2px 5px
    border-radius: 3px

    font-size: 12px
    color: white
    background-color: green
</style>
