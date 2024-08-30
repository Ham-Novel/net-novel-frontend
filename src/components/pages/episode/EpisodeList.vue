<template>
    <article class="episode-list-article">
        <div
            class="loader"
            v-if="!episodeList.previousLoad.allLoaded"
            :ref="(el) => previousLoader.observer.setTarget(el)"
        >
            <span>Previous Episode...</span>
        </div>
        <div id="contents" :ref="(el) => (scrollSynchro.contentRef = el)">
            <template v-for="(item, index) in episodeList.list" :key="item.episodeId">
                <EpisodeItem class="item" :title="item.title" :content="item.content">
                    <div
                        class="url-object-front"
                        :ref="(el) => urlDetect.observer.setTarget(el, `f${index}`)"
                        :data-key="item.episodeId"
                    ></div>
                    <div
                        class="url-object-back"
                        :ref="(el) => urlDetect.observer.setTarget(el, `b${index}`)"
                        :data-key="item.episodeId"
                    ></div>
                </EpisodeItem>
            </template>
        </div>
        <div class="loader" v-if="!episodeList.nextLoad.allLoaded" :ref="(el) => nextLoader.observer.setTarget(el)">
            <span>Next Episode...</span>
        </div>
    </article>
</template>

<script setup>
import EpisodeItem from "./EpisodeItem.vue";

import { onMounted, reactive, ref, watch, nextTick } from "vue";
import { episodeApi } from "@/hooks/backendApi";
import { useObserver } from "@/hooks/observer";

//작품, 에피소드 id 가져오기
const props = defineProps(["episodeId"]);

//EpisodeList 컴포넌트 기본 변수 및 메서드
const episodeList = reactive({
    //에피소드 데이터 저장 변수
    list: [],
    //이전 에피소드 로드 관련 변수
    previousLoad: {
        id: props.episodeId,
        allLoaded: false,
    },
    //다음 에피소드 로드 관련 변수
    nextLoad: {
        id: props.episodeId,
        allLoaded: false,
    },
    //첫번째 에피소드 로드 메서드
    async loadFirstEpisode() {
        try {
            const newItem = await episodeApi.getEpisode(props.episodeId);
            this.list.push(newItem);
        } catch {
            console.error("Error In Load First Episodes:", error);
        }
    },
    //다음 에피소드 로드 메서드
    async loadNextEpisode() {
        const resp = await episodeApi.getEpisodeBeside(this.nextLoad.id, "NEXT");
        //다음 에피소드 로드 성공 시
        if (resp.ok) {
            const newItem = await resp.json();
            this.list.push(newItem);
            this.nextLoad.id = newItem.episodeId;
            //다음 에피소드 로드 실패 시
        } else {
            this.nextLoad.allLoaded = true;
            const costPolicy = resp.json();
            switch (resp.status) {
                case 402:
                    console.log("402");
                    break;
                case 404:
                    console.log("404");
                    break;
                default:
            }
        }
    },
    async loadPreviousEpisode() {
        const resp = await episodeApi.getEpisodeBeside(this.previousLoad.id, "PREVIOUS");
        //다음 에피소드 로드 성공 시
        if (resp.ok) {
            const newItem = await resp.json();
            this.list.unshift(newItem);
            this.previousLoad.id = newItem.episodeId;
            //다음 에피소드 로드 실패 시
        } else {
            this.previousLoad.allLoaded = true;
            const costPolicy = resp.json();
            switch (resp.status) {
                case 402:
                    console.log("402");
                    break;
                case 404:
                    console.log("404");
                    break;
                default:
            }
        }
    },
});

onMounted(() => {
    //페이지 로드 시 첫번째 에피소드 로드
    episodeList.loadFirstEpisode();
});

//스크롤 높이가 에피소드 컴포넌트와 동기화 되도록 유지하는 기능
const scrollSynchro = reactive({
    contentRef: ref(null),
    oldHeight: 0,
    mark() {
        this.oldHeight = scrollSynchro.contentRef.scrollHeight;
    },
    synchronize: async () => {
        const currentPosition = window.scrollY;

        // DOM 업데이트를 기다림
        await nextTick();

        // 브라우저 화면의 스크롤 높이를 contentRef 컴포넌트가 길어진 만큼 내린다.
        const newHeight = scrollSynchro.contentRef.scrollHeight;
        const scrollTo = currentPosition + (newHeight - scrollSynchro.oldHeight);
        console.log(scrollSynchro.oldHeight, newHeight, scrollTo);
        window.scrollTo(0, scrollTo);
    },
});

//최하단 스크롤 시 다음 에피소드 로드하는 기능
const nextLoader = reactive({
    observer: useObserver({ threshold: 0 }),
    handler: (intersect) => {
        if (intersect.state) {
            episodeList.loadNextEpisode();
        }
    },
});
//observer 발동 시 이벤트 핸들러 실행
watch(nextLoader.observer.intersection, nextLoader.handler);

//최상단 스크롤 시 이전 에피소드 로드하는 기능
const previousLoader = reactive({
    observer: useObserver({ threshold: 0 }),
    handler: async (intersect) => {
        if (intersect.state) {
            scrollSynchro.mark();
            await episodeList.loadPreviousEpisode();
            scrollSynchro.synchronize();
        }
    },
});
//observer 발동 시 이벤트 핸들러 실행
watch(previousLoader.observer.intersection, previousLoader.handler);

//각 에피소드 페이지마다 URL 변경
const urlDetect = reactive({
    observer: useObserver({
        threshold: 1, // 요소의 80%가 보이면 새 항목을 로드합니다
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

<style scoped lang="sass">

.episode-list-article
    position: relative
    min-height: 1000px
    background-color: #f3f2f1

    .loader
        margin: 0 auto
        width: 900px
        height: 100px
        background-color: white

        display: flex
        justify-content: center
        align-items: center

        span
            display: inline

#contents
    margin-top: 50px
    min-height: 300px
    scroll-padding-top: 0px

    section
        margin-bottom: 10px

    .url-object-front
        position: absolute
        top: 0
        width: 100%
        height: 80vh
        // background-color: blue

    .url-object-back
        position: absolute
        bottom: 0
        width: 100%
        height: 80vh
        // background-color: blue
</style>
