<template>
    <CardItem v-bind="itemProps">
        <template #cover>
            <p class="status">{{ novelStatus }}</p>
        </template>
    </CardItem>
</template>

<script setup>
import CardItem from "@/components/reusable/novel/CardItem.vue";
import Tag from "@/components/reusable/Tag.vue";
import { computed, onMounted, ref } from "vue";

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

const statusColor = ref("green");

const novelStatus = computed(() => {
    switch (props.novel.status) {
        case "ONGOING":
            statusColor.value = "green";
            return "연재중";
            break;
        case "DELAYED":
            statusColor.value = "orange";
            return "휴재";
            break;
        case "GIVEUP":
            statusColor.value = "red";
            return "연재 중단";
            break;
        case "COMPLETED":
            statusColor.value = "white";
            return "완결";
            break;
        default:
            statusColor.value = "gray";
            return "불명";
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
    background-color: v-bind(statusColor)
</style>
