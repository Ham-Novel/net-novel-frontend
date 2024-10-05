<template>
    <section class="header">
        <div class="alignment">
            <span>총 {{ episodeInfo.chapterCount }}화</span>
            <span>최신 업데이트: {{ formatUtil.formatDate(episodeInfo.lastUpdatedAt) }}</span>
            <span class="sort">
                <label for="initial">
                    <input
                        type="radio"
                        name="episode-sort"
                        id="initial"
                        value="initial"
                        v-model="sort"
                    />
                    첫화부터
                </label>
                <label for="recent">
                    <input
                        type="radio"
                        name="episode-sort"
                        id="recent"
                        value="recent"
                        v-model="sort"
                    />
                    최신순
                </label>
            </span>
        </div>
    </section>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import { formatUtil } from "@/hooks/format";
import { episodeApi } from "@/hooks/backendApi";

const props = defineProps({
    novelId: {
        type: Number,
        required: true,
    },
});

const sort = defineModel();

//작품 에피소드의 메타 데이터
const episodeInfo = ref({
    chapterCount: "Error",
    lastUpdatedAt: "Error",
});

async function loadInfo() {
    try {
        const loadData = await episodeApi.getEpisodesInfoByNovel(props.novelId);
        episodeInfo.value = loadData;
    } catch (error) {
        console.error("Failed to load episode info");
    }
}

onMounted(() => {
    loadInfo();
});
</script>

<style lang="sass" scoped>
.header
    border-bottom: 2px solid var(--pico-text-color)
    font-size: 0.8rem
    padding: 10px
    margin-bottom: 10px

    .alignment
        position: relative
        margin-bottom: 10px
        display: flex
        flex-direction: row
        justify-content: space-between

        span
            width: 9rem

        .sort
            display: flex
            flex-flow: row wrap
            justify-content: end
            gap: 0.5rem

            label
                margin: 0
                display: flex
                align-items: center
                gap: 0.2rem

            input
                width: 20px
                height: 20px
                margin: 0
</style>
