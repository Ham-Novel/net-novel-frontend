<template>
    <ListItem v-bind="itemProps">
        <template #default>
            <p>{{ props.novel.authorName }}</p>
            <p>{{ props.novel.novelType }}</p>
            <p>{{ formatUtil.formatRealTime(props.novel.updatedAt) }}</p>
            <p></p>
            <div class="item-feature">
                <button class="continue-episode">{{ props.novel.episodeTitle }} >></button>
                <!-- <button class="add-library">+선호작</button> -->
            </div>
        </template>
    </ListItem>
</template>

<script setup>
import ListItem from "@/components/reusable/novel/ListItem.vue";
import { formatUtil } from "@/hooks/format";

const props = defineProps({
    novel: {
        type: Object,
        required: true,
    },
});

const itemProps = {
    brief: {
        title: props.novel.novelTitle,
        coverImg: "/cover/fantasy_cover.jpeg",
    },
    link: { name: "novel", params: { id: props.novel.novelId } },
};

//선호작 버튼 기능
// const isFavoriteMsg = (itemInfo) => {
//     if (itemInfo.isFavorite) {
//         return "-선호작";
//     } else {
//         return "+선호작";
//     }
// };
</script>

<style scoped lang="sass">
.item-feature
    position: absolute
    bottom: 0px
    right: 10px
    display: flex
    flex-flow: row wrap
    gap: 30px

    .continue-episode
        background: none
        border: none
        cursor: pointer

    .add-library
        background: none
        border: none
        height: 35px
        padding: 0 25px
        border-radius: 20px
        background-color: #e6e6fa
        cursor: pointer
</style>
