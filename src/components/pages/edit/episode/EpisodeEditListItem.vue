<template>
    <tr @click="goToEdit">
        <td scope="row">Ep. {{ episode.chapter }}</td>
        <td>{{ episode.title }}</td>
        <td>{{ formatUtil.formatRealTime(episode.uploadDate) }}</td>
        <td>
            <span class="word-count"><FileText :size="15" />{{ episode.letterCount }}</span>
        </td>
        <td>
            <span class="view-count"><Eye :size="15" />{{ episode.views }}</span>
        </td>
        <td>
            <span class="comment-count"
                ><MessageCircleMore :size="15" />{{ episode.commentCount }}</span
            >
        </td>
    </tr>
</template>

<script setup>
import { computed } from "vue";
import { formatUtil } from "@/hooks/format";
import { FileText, Eye, MessageCircleMore, Coins } from "lucide-vue-next";
import { useRouter } from "vue-router";

//애피소드 정보 episode 변수로 받아오기
const props = defineProps({
    novelId: {
        type: Number,
        required: true,
    },
    episode: {
        type: Object,
        required: true,
    },
});

const router = useRouter();

//아이템 클릭 시 해당 에피소드 수정 페이지로 이동
function goToEdit() {
    router.push({
        name: "episode-update",
        params: { novelId: props.novelId, episodeId: props.episode.episodeId },
    });
}
</script>

<style scoped lang="sass">
tr
    font-size: 0.9rem
    cursor: pointer

span
    display: flex
    align-items: center
    gap: 0.1rem
</style>
