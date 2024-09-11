<template>
    <article class="item" @click="openEpisode">
        <div class="chapter">EP.{{ episode.chapter }}</div>
        <div class="title">{{ episode.title }}</div>
        <div class="stats">
            <div>
                <FileText :size="15" />
                <span class="word-count">{{ episode.letterCount }}</span>
            </div>
            <div>
                <Eye :size="15" />
                <span class="view-count">{{ episode.views }}</span>
            </div>
            <div>
                <MessageCircleMore :size="15" />
                <span class="comment-count">{{ episode.commentCount }}</span>
            </div>
            <div>
                <Coins :size="15" />
                <span class="comment-count">{{ episode.coinCost }}</span>
            </div>
            <div class="upload-date">{{ uploadDateFommatted }}</div>
        </div>
    </article>
</template>

<script setup>
import { computed } from "vue";
import { formatUtil } from "@/hooks/format";
import { FileText, Eye, MessageCircleMore, Coins } from "lucide-vue-next";
import { useRouter } from "vue-router";

//애피소드 정보 episode 변수로 받아오기
const props = defineProps(["episode"]);
const episode = props.episode;

//에피소드 업로드 날짜, 자동으로 formatting하는 computed 변수
const uploadDateFommatted = computed(() => {
    return formatUtil.formatDate(episode.uploadDate);
});

const router = useRouter();

//요소 클릭 시 해당 에피소드 페이지로 이동
function openEpisode() {
    console.log(episode.episodeId);
    router.push({
        name: "episode",
        params: { episodeId: episode.episodeId },
    });
}
</script>

<style scoped lang="sass">
.item
    display: flex
    align-items: center
    padding: 20px
    border-bottom: 4px solid var(--bg-sub)
    cursor: pointer

    &:hover
        background-color: var(--bg-sub)


.chapter
    width: 50px
    font-weight: 800


.title
    flex-grow: 1
    margin-right: 20px
    font-size: 16px
    font-weight: 700


.stats
    display: flex
    align-items: center
    justify-content: space-between
    gap: 20px


    div
        display: flex
        align-items: center
        gap: 2px


    span
        vertical-align: middle
        line-height: 15px


.upload-date
    text-align: right
</style>
