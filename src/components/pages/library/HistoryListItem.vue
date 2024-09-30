<template>
    <ListItem
        class="browse-item"
        :cover-img="novel.thumbnailUrl"
        :link="{ name: 'novel', params: { id: novel.id } }"
    >
        <template #cover>
            <p class="type">{{ novelType }}</p>
        </template>
        <template #default>
            <div class="detail">
                <h4>{{ novel.novelTitle }}</h4>
                <p class="author">
                    <PencilLine size="17" stroke-width="2.3" />
                    {{ props.novel.authorName }}
                </p>
            </div>
            <p class="time">
                <Clock8 size="17" stroke-width="2.3" />
                {{ formatUtil.formatRealTime(props.novel.updatedAt) }}
            </p>
            <div class="feature">
                <button class="secondary" @click="goToRead(props.novel.episodeId)">
                    이어 읽기 >> {{ props.novel.episodeTitle }}
                </button>
            </div>
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

onMounted(() => {
    console.log(props.novel);
});

const router = useRouter();
function goToRead(episodeId) {
    router.push({ name: "episode", params: { episodeId } });
}
</script>

<style scoped lang="sass">
.item
    height: 150px

.detail
    width: 70%
    display: flex
    flex-flow: column wrap
    gap: 10px

    p
        font-size: 0.8rem

.feature
    position: absolute
    bottom: 5px
    right: 10px
    display: flex
    flex-flow: row wrap
    gap: 30px

    button
        font-size: 0.8rem

.time
    position: absolute
    top: 5px
    right: 10px

    display: flex
    align-items: center
    gap: 5px


.type
    position: absolute
    top: 0
    left: 0

    display: inline-block
    padding: 2px 5px
    border-bottom-right-radius: 5px

    font-size: 0.6rem
    color: white
    background-color: green
</style>
