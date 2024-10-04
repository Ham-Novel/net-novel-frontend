<template>
    <section>
        <div class="base-wrapper base-distance">
            <div class="histories">
                <InfiniteScroll v-bind="scrollProps">
                    <template #default="{ item }">
                        <ListItem
                            :id="item.id"
                            :title="item.title"
                            :author="item.authorName"
                            :cover-img="item.thumbnailUrl"
                        >
                            <template #cover>
                                <p class="type">{{ displayType(item.novelType) }}</p>
                            </template>
                            <template #default>
                                <p class="time">
                                    <Clock8 size="17" stroke-width="2.3" />
                                    {{ formatUtil.formatRealTime(item.updatedAt) }}
                                </p>
                                <div class="feature">
                                    <button
                                        class="secondary"
                                        @click="goToRead(item.id, item.episodeId)"
                                    >
                                        이어 읽기 >> {{ item.episodeTitle }}
                                    </button>
                                </div>
                            </template>
                        </ListItem>
                    </template>
                </InfiniteScroll>
            </div>
        </div>
    </section>
</template>

<script setup>
import ListItem from "@/components/reusable/novel/ListItem.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";
import { Clock8 } from "lucide-vue-next";

import { ref, onMounted, reactive, markRaw } from "vue";
import { formatUtil } from "@/hooks/format";
import { memberApi } from "@/hooks/backendApi";
import { useRouter } from "vue-router";

//InfiniteScroll props 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 10 },
    loadMethod: async (page, size) => {
        const novels = await memberApi.getRecentReadNovels(page, size);
        console.log(novels[1]);
        return novels;
    },
});

const statusColor = ref("green");

const displayType = (type) => {
    switch (type) {
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
};

const router = useRouter();
function goToRead(novelId, episodeId) {
    router.push({ name: "episode", params: { novelId, episodeId } });
}
</script>

<style scoped lang="sass">


.histories
    padding-top: 30px
    min-height: 500px
    display: flex
    justify-content: flex-start
    flex-flow: column wrap
    gap: 10px

.feature
    position: absolute
    bottom: 1rem
    right: 1rem
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

    font-size: 0.7rem
    color: white
    background-color: v-bind(statusColor)
</style>
