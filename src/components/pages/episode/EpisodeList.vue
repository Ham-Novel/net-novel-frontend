<template>
    <article>
        <template
            v-for="(item, index) in episodeList.list"
            :key="item.episodeId"
        >
            <EpisodeItem
                class="item"
                :title="item.title"
                :content="item.content"
                :ref="(el) => urlDetect.observer.setTarget(el, index)"
                :data-key="item.episodeId"
            ></EpisodeItem>
        </template>
        <teleport to="main">
            <div
                class="loader"
                v-if="!episodeList.allLoaded"
                :ref="(el) => scrollLoad.loader.setTarget(el)"
            >
                Loading
            </div>
        </teleport>
    </article>
</template>

<script setup>
import EpisodeItem from "./EpisodeItem.vue";

import { onMounted, reactive, ref, watch } from "vue";
import { episodeApi } from "@/backendApi";
import { useObserver } from "@/hooks/observer";

//작품, 에피소드 id 가져오기
const props = defineProps(["episodeId"]);

//EpisodeList 컴포넌트 기본 변수 및 메서드
const episodeList = reactive({
    list: [],
    lastItemId: props.episodeId,
    allLoaded: false,
    //다음 에피소드 로드 메서드
    async loadFirstEpisode() {
        try {
            const newItem = await episodeApi.getEpisode(props.episodeId);
            this.list.push(newItem);
        } catch {
            console.error("Error In Load First Episodes:", error);
        }
    },
    //첫번째 에피소드 로드 메서드
    async loadNextEpisode() {
        const newItem = await episodeApi.getEpisodeNext(this.lastItemId);
        if (newItem ?? false) {
            this.list.push(newItem);
            this.lastItemId = newItem.episodeId;
        } else {
            allLoaded.value = true;
        }
    },
});

onMounted(() => {
    //페이지 로드 시 첫번째 에피소드 로드
    episodeList.loadFirstEpisode();
});

//최하단 스크롤 시 에피소드 로드하는 기능
const scrollLoad = reactive({
    loader: useObserver({ threshold: 0 }),
    handler(intersect) {
        if (intersect.state) {
            episodeList.loadNextEpisode();
        }
    },
});

watch(scrollLoad.loader.intersection, scrollLoad.handler); //observer 발동 시 이벤트 핸들러 실행

//각 에피소드 페이지마다 URL 변경
const urlDetect = reactive({
    observer: useObserver({
        threshold: 0.8, // 요소의 80%가 보이면 새 항목을 로드합니다
    }),
    handler: (intersect) => {
        if (intersect.state) {
            console.log(intersect.data);
            urlDetect.updateURL(intersect.data.key);
        }
    },
    updateURL: (episodeId) => {
        window.history.replaceState(null, "", `/episodes/${episodeId}`);
    },
});

watch(urlDetect.observer.intersection, urlDetect.handler);
</script>

<style scoped lang="sass"></style>
