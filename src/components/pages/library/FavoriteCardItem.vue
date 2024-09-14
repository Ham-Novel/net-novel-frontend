<template>
    <CardItem v-bind="itemProps">
        <template #cover>
            <p class="status">{{ novelStatus }}</p>
        </template>
        <template #default>
            <p class="stats">
                <span> <Eye size="17" /> {{ novel.views }} </span>
                <span>
                    <Heart size="17" />
                    {{ novel.favoriteCount }}
                </span>
                <span>
                    <Layers size="17" />
                    {{ novel.episodeCount }}
                </span>
            </p>
        </template>
    </CardItem>
</template>

<script setup>
import CardItem from "@/components/reusable/novel/CardItem.vue";
import { Eye, Heart, Layers } from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps({
    novel: {
        type: Object,
        required: true,
    },
});

const itemProps = {
    brief: {
        title: props.novel.title,
        coverImg: props.novel.thumbnailUrl,
    },
    link: { name: "novel", params: { id: props.novel.novelId } },
};

const novelStatus = computed(() => {
    switch (props.novel.status) {
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
</script>

<style scoped lang="sass">
.item
    width: 150px
    gap: 5px

    :deep(.info)
        .title
            font-size: 20px
            font-weight: 700


.status
    position: absolute
    top: 0
    right: 0

    display: inline-block
    padding: 2px 5px
    border-radius: 3px

    font-size: 12px
    color: white
    background-color: green

.stats
    margin-top: 5px
    display: flex
    flex-flow: row wrap
    font-size: 13px
    gap: 10px

    span
        display: flex
        align-items: center
        gap: 1px
</style>
