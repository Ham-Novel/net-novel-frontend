<template>
    <div class="episode-list-article">
        <div
            class="loader"
            v-if="priorLoader.state === loadState.ok && mountLoader.state === loadState.ok"
            :ref="(el) => priorDetect.observer.setTarget(el)"
        ></div>
        <div id="contents" :ref="(el) => (scrollSynchro.contentRef = el)">
            <template v-for="(item, index) in episodeList.list" :key="item.episodeId">
                <component
                    class="item"
                    :is="item.component"
                    :episode="item"
                    :payment="item"
                    @payment-accepted="reloadEpisode"
                >
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
                </component>
            </template>
        </div>
        <div
            class="loader"
            v-if="nextLoader.state === loadState.ok && mountLoader.state === loadState.ok"
            :ref="(el) => nextDetect.observer.setTarget(el)"
        ></div>
    </div>
</template>

<script setup>
import EpisodeItem from "./EpisodeItem.vue";
import PaymentItem from "./PaymentItem.vue";

import { onMounted, reactive, ref, watch, nextTick, markRaw, computed } from "vue";
import { episodeApi } from "@/hooks/backendApi";
import { useObserver } from "@/hooks/observer";

//작품, 에피소드 id 가져오기
const props = defineProps(["episodeId"]);

//에피소드 데이터 저장 변수 및 제어 메서드
const episodeList = reactive({
    list: [],
    addFront(item, component) {
        item.component = component;
        this.list.unshift(item);
    },
    addBack(item, component) {
        item.component = component;
        this.list.push(item);
    },
    setHere(item, component) {
        item.component = component;
        this.list[0] = item;
    },
    removeFront() {
        this.list.shift();
    },
    removeBack() {
        this.list.pop();
    },
    changeItem(index, item) {
        this.list[index] = item;
    },
    reset: () => {
        episodeList.list.splice(0, episodeList.list.length);
    },
});

const loadState = Object.freeze({
    ok: Symbol(),
    payment: Symbol(),
    notFound: Symbol(),
});

const mountLoader = reactive({
    state: loadState.ok,
    async load() {
        const resp = await episodeApi.getEpisode(props.episodeId);
        const handler = this.handleResponse(resp.status);
        handler(resp);
    },
    handleResponse(status) {
        switch (status) {
            case 200:
                return this.handleOk;
                break;
            case 402:
                return this.handlePayment;
                break;
            case 404:
                return this.handleNotFound;
                break;
        }
    },
    handleOk: async (resp) => {
        const item = await resp.json();
        episodeList.addBack(item, markRaw(EpisodeItem));
    },
    handlePayment: async (resp) => {
        const payment = await resp.json();
        episodeList.addBack(payment, markRaw(PaymentItem));
        mountLoader.state = loadState.payment;
    },
    handleNotFound: async (resp) => {
        mountLoader.state = loadState.notFound;
    },
    reload: async () => {
        const resp = await episodeApi.getEpisode(props.episodeId);
        const episode = await resp.json();
        episodeList.reset();
        episodeList.addBack(episode, markRaw(EpisodeItem));
        mountLoader.state = loadState.ok;
        console.log(mountLoader.state, nextLoader.state, priorLoader.state);
    },
});
//페이지 로드 시 첫번째 에피소드 로드
onMounted(() => {
    mountLoader.load();
});

const reloadEpisode = async (episodeId) => {
    const resp = await episodeApi.getEpisode(episodeId);
    const episode = await resp.json();
    if (mountLoader.state === loadState.payment) {
        mountLoader.reload();
    } else if (episodeId === priorLoader.loadedId) {
        episodeList.removeFront(episode);
        episodeList.addFront(episode, markRaw(EpisodeItem));
        priorLoader.state = loadState.ok;
    } else if (episodeId === nextLoader.loadedId) {
        nextLoader.reload();
    }
};

//최상단 스크롤 시 이전 에피소드 로드하는 기능
const priorLoader = reactive({
    loadedId: props.episodeId,
    state: loadState.ok,
    async load() {
        const resp = await episodeApi.getEpisodeBeside(this.loadedId, "PREVIOUS");
        const handler = this.handleResponse(resp.status);
        await handler(resp);
    },
    handleResponse(status) {
        switch (status) {
            case 200:
                return this.handleOk;
                break;
            case 402:
                return this.handlePayment;
                break;
            case 404:
                return this.handleNotFound;
                break;
        }
    },
    handleOk: async (resp) => {
        const item = await resp.json();
        episodeList.addFront(item, markRaw(EpisodeItem));
        priorLoader.loadedId = item.episodeId;
    },
    handlePayment: async (resp) => {
        const payment = await resp.json();
        episodeList.addFront(payment, markRaw(PaymentItem));
        priorLoader.state = loadState.payment;
        priorLoader.loadedId = payment.episodeId;
    },
    handleNotFound: async (resp) => {
        priorLoader.state = loadState.notFound;
    },
    reload: async () => {
        const resp = await episodeApi.getEpisode(priorLoader.loadedId);
        const episode = await resp.json();
        episodeList.removeFront(episode);
        episodeList.addFront(episode, markRaw(EpisodeItem));
        priorLoader.state = loadState.ok;
    },
});

const priorDetect = reactive({
    observer: useObserver({ threshold: 0 }),
    handler: async (intersect) => {
        if (intersect.state) {
            scrollSynchro.mark();
            await priorLoader.load();
            scrollSynchro.synchronize();
        }
    },
});
watch(priorDetect.observer.intersection, priorDetect.handler);

const nextLoader = reactive({
    loadedId: props.episodeId,
    state: loadState.ok,
    async load() {
        const resp = await episodeApi.getEpisodeBeside(this.loadedId, "NEXT");
        const handler = this.handleResponse(resp.status);
        handler(resp);
    },
    handleResponse(status) {
        switch (status) {
            case 200:
                return this.handleOk;
                break;
            case 402:
                return this.handlePayment;
                break;
            case 404:
                return this.handleNotFound;
                break;
        }
    },
    handleOk: async (resp) => {
        const item = await resp.json();
        episodeList.addBack(item, markRaw(EpisodeItem));
        nextLoader.loadedId = item.episodeId;
    },
    handlePayment: async (resp) => {
        const payment = await resp.json();
        episodeList.addBack(payment, markRaw(PaymentItem));
        nextLoader.state = loadState.payment;
        nextLoader.loadedId = payment.episodeId;
    },
    handleNotFound: async (resp) => {
        nextLoader.state = loadState.notFound;
    },
    reload: async () => {
        const resp = await episodeApi.getEpisode(nextLoader.loadedId);
        const episode = await resp.json();
        episodeList.removeBack(episode);
        episodeList.addBack(episode, markRaw(EpisodeItem));
        nextLoader.state = loadState.ok;
    },
});

//최하단 스크롤 시 다음 에피소드 로드하는 기능
const nextDetect = reactive({
    observer: useObserver({ threshold: 0 }),
    handler: (intersect) => {
        if (intersect.state) {
            nextLoader.load();
        }
    },
});
watch(nextDetect.observer.intersection, nextDetect.handler);

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
        console.log(scrollSynchro.oldHeight, currentPosition, scrollTo);
        window.scrollTo(0, scrollTo);
    },
});

//각 에피소드 페이지마다 URL 변경
const urlDetect = reactive({
    observer: useObserver({
        threshold: 1, // 요소의 80%가 보이면 새 항목을 로드합니다
    }),
    handler: (intersect) => {
        if (intersect.state) {
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
    min-height: 900px
    background-color: #f3f2f1
    display: flow-root

    .loader
        margin: 0 auto
        width: 900px
        height: 0px
        background-color: white

        display: flex
        justify-content: center
        align-items: center

#contents
    width: 900px
    min-height: 900px
    margin: 0px auto
    margin-top: 50px
    min-height: 300px
    scroll-padding-top: 0px
    box-shadow: 8px 0 6px -3px rgba(0, 0, 0, 0.2), -8px 0 6px -3px rgba(0, 0, 0, 0.2)

    .url-object-front
        position: absolute
        top: 0
        width: 100%
        height: 80vh
        z-index: -1
        // background-color: blue

    .url-object-back
        position: absolute
        bottom: 0
        width: 100%
        height: 80vh
        z-index: -1
        // background-color: blue
</style>
