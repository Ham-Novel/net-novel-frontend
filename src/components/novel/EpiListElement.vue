<template>
    <article>
        <div class="episode-episodeNumber">EP.{{ episode.episodeNumber }}</div>
        <div class="episode-title">{{ episode.title }}</div>
        <div class="episode-stats">
            <div>
                <FileText :size="15" />
                <span class="word-count">{{ episode.content.length }}</span>
            </div>
            <div>
                <Eye :size="15" />
                <span class="view-count">{{ episode.view }}</span>
            </div>
            <div>
                <MessageCircleMore :size="15" />
                <span class="comment-count">{{ episode.commentAmount }}</span>
            </div>
            <div class="upload-date">{{ createdDate }}</div>
        </div>
    </article>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { FileText, Eye, MessageCircleMore } from "lucide-vue-next";

const props = defineProps({
    episode: {
        type: Object,
        required: true,
    },
});

const episode = props.episode;

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}.${month}.${day}`;
};
const createdDate = computed(() => {
    return formatDate(episode.createdAt);
});

function openEpisode(episodeId) {
    // console.log(`Opening episode with ID: ${episodeId}`);
    // Here you would typically navigate to the episode page
    // router.push(`/episode/${episodeId}`);
}

onMounted(() => {
    // console.log(episode);
});
</script>

<style scoped>
article {
    display: flex;
    align-items: center;
    padding: 10px;
    padding-top: 20px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
}

.episode-item:hover {
    background-color: #f5f5f5;
}

.episode-episodeNumber {
    width: 50px;
    font-weight: bold;
}

.episode-title {
    flex-grow: 1;
    margin-right: 20px;
    font-size: 16px;
    font-weight: bold;
}

.episode-stats {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

.episode-stats > div {
    display: flex;
    align-items: center;
    gap: 2px;
}

.episode-stats span {
    color: #666;
    font-size: 1em;
    vertical-align: middle;
    line-height: 15px;
}

.upload-date {
    width: 80px;
    text-align: right;
    color: #666;
    font-size: 1em;
}
</style>
