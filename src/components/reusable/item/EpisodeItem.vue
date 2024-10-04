<template>
    <tr @click="openEpisode">
        <td scope="row" class="chapter">Ep.</td>
        <td scope="row" class="chapter">{{ episode.chapter }}</td>
        <td class="title">
            <div>{{ episode.title }}</div>
        </td>
        <td class="stat" v-if="stats">
            <span class="word-count"
                ><FileText :size="15" />{{ formatUtil.formatStat(episode.letterCount) }}</span
            >
        </td>
        <td class="stat" v-if="stats">
            <span class="view-count"
                ><Eye :size="15" />{{ formatUtil.formatStat(episode.views) }}</span
            >
        </td>
        <td class="stat" v-if="stats">
            <span class="comment-count">
                <MessageCircleMore :size="15" />{{ episode.commentCount }}
            </span>
        </td>
        <td class="stat" v-if="stats">
            <span class="comment-count"><Coins :size="15" />{{ episode.coinCost }}</span>
        </td>
        <td class="upload-date">{{ uploadDateFommatted }}</td>
    </tr>
</template>

<script setup>
import { computed } from "vue";
import { formatUtil } from "@/hooks/format";
import { FileText, Eye, MessageCircleMore, Coins } from "lucide-vue-next";
import { useRoute, useRouter } from "vue-router";

//애피소드 정보 episode 변수로 받아오기
const props = defineProps({
    episode: {
        type: Object,
        required: true,
    },
    stats: {
        type: Boolean,
        default: true,
    },
});
const episode = props.episode;

//에피소드 업로드 날짜, 자동으로 formatting하는 computed 변수
const uploadDateFommatted = computed(() => {
    return formatUtil.formatRealTime(episode.uploadDate);
});

const router = useRouter();
const route = useRoute();

//요소 클릭 시 해당 에피소드 페이지로 이동
function openEpisode() {
    router.push({
        name: "episode",
        params: { episodeId: episode.episodeId },
    });
}
</script>

<style scoped lang="sass">
tr
    cursor: pointer


td
    padding: 10px

.chapter
    padding: 0
    font-size: 0.9rem
    font-weight: bold


.title
    font-size: 0.8rem
    font-weight: bold

    div
        width: 300px
        height: 30px
        overflow: hidden
        white-space: nowrap
        word-wrap: break-word
        text-overflow: ellipsis
        display: flex
        align-items: center

.stat
    span
        font-size: 0.7rem
        display: flex
        align-items: center
        gap: 2px


.upload-date
    text-align: right
    font-size: 0.8rem
</style>
