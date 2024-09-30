<template>
    <CardItem v-bind="itemProps">
        <template #cover>
            <p class="status">{{ novel.status }}</p>
        </template>
    </CardItem>
</template>

<script setup>
import CardItem from "@/components/reusable/novel/CardItem.vue";
import Tag from "@/components/reusable/Tag.vue";
import { computed, onMounted } from "vue";

const props = defineProps({
    novel: {
        type: Object,
        required: true,
    },
});

console.log(props.novel);

const itemProps = {
    brief: {
        title: props.novel.title,
        coverImg: props.novel.thumbnailUrl,
    },
    link: { name: "novel", params: { id: props.novel.id } },
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
    width: 130px
    gap: 5px


.status
    position: absolute
    top: 0
    left: 0

    display: inline-block
    padding: 2px 5px
    border-bottom-right-radius: 5px

    font-size: 0.7rem
    color: white
    background-color: green
</style>
