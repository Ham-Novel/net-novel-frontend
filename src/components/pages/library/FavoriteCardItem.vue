<template>
    <CardItem v-bind="itemProps">
        <p class="author">{{ props.novel.authorName }}</p>
        <p class="status">{{ novelStatus }}</p>
    </CardItem>
</template>

<script setup>
import CardItem from "@/components/reusable/novel/CardItem.vue";
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
        coverImg: "/cover/fantasy_cover.jpeg",
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

    :deep(.info)
        p
            margin-top: 3px
            font-size: 14px

        .author
            color: gray
            font-weight: bold

        .status
            display: inline-block
            padding: 1px 4px
            border-radius: 3px
            color: white
            background-color: green
</style>
