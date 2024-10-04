<template>
    <section class="structure pages">
        <div class="load-container prior">
            <Loader
                v-if="
                    priorLoader.state.value === loadState.ok &&
                    mountLoader.state.value === loadState.ok
                "
                @load-method="loadPrior"
            ></Loader>
            <h5
                v-else-if="
                    priorLoader.state.value === loadState.payment ||
                    mountLoader.state.value === loadState.payment
                "
            >
                결제가 필요합니다.
            </h5>
            <h5 v-else>최초 회차입니다.</h5>
        </div>
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
                        class="url-object front"
                        :ref="(el) => urlDetect.observer.setTarget(el, `f${index}`)"
                        :data-key="item.episodeId"
                    ></div>
                    <div
                        class="url-object back"
                        :ref="(el) => urlDetect.observer.setTarget(el, `b${index}`)"
                        :data-key="item.episodeId"
                    ></div>
                </component>
            </template>
        </div>
        <div class="load-container next">
            <Loader
                v-if="
                    nextLoader.state.value === loadState.ok &&
                    mountLoader.state.value === loadState.ok
                "
                @load-method="loadNext"
            ></Loader>
            <h5
                v-else-if="
                    nextLoader.state.value === loadState.payment ||
                    mountLoader.state.value === loadState.payment
                "
            >
                결제가 필요합니다.
            </h5>
            <h5 v-else class="all-loaded">마지막 회차입니다.</h5>
        </div>
    </section>
</template>

<script setup>
import EpisodeItem from "./EpisodeItem.vue";
import PaymentItem from "./PaymentItem.vue";
import Loader from "./Loader.vue";

import { onMounted, reactive, ref, watch, nextTick, markRaw, computed } from "vue";
import { episodeApi } from "@/hooks/backendApi";
import { useObserver } from "@/hooks/observer";
import { useRouter } from "vue-router";
import { useEpisodePageStore } from "./episodePageStore";

//에피소드 페이지 전역 변수
const episodeStore = useEpisodePageStore();

const router = useRouter();

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

const useLoader = ({ loadMethod, handlePayment, handleNotFound } = {}) => {
    const state = ref(loadState.ok);
    let loadId = ref(props.episodeId);

    const load = async () => {
        try {
            loadId.value = await loadMethod(loadId.value);
        } catch (error) {
            console.error(error);
            switch (error.response.status) {
                case 402:
                    loadId.value = await handlePayment(error.response.data);
                    state.value = loadState.payment;
                    break;
                case 404:
                    if (handleNotFound ?? false) {
                        handleNotFound();
                    }
                    state.value = loadState.notFound;
                    break;
                default:
                    console.error("unknown loader error");
            }
        }
    };

    const reload = () => {
        state.value = loadState.ok;
    };

    return { state: state, loadId: loadId, load, reload };
};

//페이지 로드 시 첫번째 에피소드 로드
const mountLoader = useLoader({
    loadMethod: async (id) => {
        const loadData = await episodeApi.getEpisode(id);
        episodeList.addBack(loadData, markRaw(EpisodeItem));
        return loadData.episodeId;
    },
    handlePayment: (paymentData) => {
        episodeList.addBack(paymentData, markRaw(PaymentItem));
        return paymentData.episodeId;
    },
    handleNotFound: () => {
        router.go(-1);
    },
});

//최상단 스크롤 시 이전 에피소드 로드하는 기능
const priorLoader = useLoader({
    loadMethod: async (id) => {
        const loadData = await episodeApi.getEpisodeBeside(id, "PREVIOUS");
        episodeList.addFront(loadData, markRaw(EpisodeItem));
        return loadData.episodeId;
    },
    handlePayment: (paymentData) => {
        episodeList.addFront(paymentData, markRaw(PaymentItem));
        return paymentData.episodeId;
    },
});

//최하단 스크롤 시 다음 에피소드 로드하는 기능
const nextLoader = useLoader({
    loadMethod: async (id) => {
        const loadData = await episodeApi.getEpisodeBeside(id, "NEXT");
        episodeList.addBack(loadData, markRaw(EpisodeItem));
        return loadData.episodeId;
    },
    handlePayment: (paymentData) => {
        episodeList.addBack(paymentData, markRaw(PaymentItem));
        return paymentData.episodeId;
    },
});

onMounted(() => {
    console.log("mount");
    mountLoader.load();
});

const loadPrior = async () => {
    console.log("prior");

    scrollSynchro.mark();
    await priorLoader.load();
    scrollSynchro.synchronize();
};

const loadNext = () => {
    console.log("next");

    nextLoader.load();
};

const reloadEpisode = async (episodeId) => {
    const episode = await episodeApi.getEpisode(episodeId);
    episode.component = markRaw(EpisodeItem);

    const index = episodeList.list.findIndex((el) => el.episodeId === episodeId);
    episodeList.list[index] = episode;

    if (mountLoader.state.value === loadState.payment) {
        mountLoader.reload();
    } else if (episodeId === priorLoader.loadId.value) {
        priorLoader.reload();
    } else if (episodeId === nextLoader.loadId.value) {
        nextLoader.reload();
    }
};

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
            episodeStore.episodeId = Number(intersect.data.key);
        }
    },
    updateURL: (episodeId) => {
        window.history.replaceState(
            null,
            "",
            `/novels/${episodeStore.novelId}/episodes/${episodeId}`
        );
    },
});
watch(urlDetect.observer.intersection, urlDetect.handler);
</script>

<style scoped lang="sass">

.structure
    position: relative
    width: 900px
    margin: 0px auto

.pages
    min-height: 1000px
    scroll-padding-top: 0px
    box-shadow: 8px 0 6px -3px rgba(0, 0, 0, 0.2), -8px 0 6px -3px rgba(0, 0, 0, 0.2)


.load-container
    width: 100%
    height: 50px

    display: flex
    justify-content: center
    align-items: center

    &.prior
        position: relative

    &.next
        position: absolute
        bottom: 0

#contents
    margin-top: 100px
    padding-bottom: 100px

    .url-object
        position: absolute
        width: 40vh
        height: 80vh
        z-index: -1
        // border: 5px solid blue

        &.front
            top: 0

        &.back
            bottom: 0
</style>
