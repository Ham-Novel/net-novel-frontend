<template>
    <section>
        <template v-for="item in itemList">
            <EpisodeItem
                class="item"
                :title="item.title"
                :content="item.content"
                v-intersection="urlObversingOptions(item)"
            ></EpisodeItem>
        </template>
        <teleport to="body">
            <div class="loader" v-intersection="loadOptions" v-if="!allLoaded">
                Loading
            </div>
        </teleport>
    </section>
</template>

<script setup>
import EpisodeItem from "./EpisodeItem.vue";

import { onMounted, reactive, ref } from "vue";
import { episodeApi } from "@/backendApi";
import { useRouter } from "vue-router";

const props = defineProps(["novelId", "episodeId"]);

//무한 스크롤 렌더링
const loadOptions = {
    handler: scrollLoadEvent,
    options: {
        threshold: 0, // 로더의 50%가 보이면 새 항목을 로드합니다
    },
};

const itemList = reactive([]);
const lastEpisode = ref(props.episodeId);
const allLoaded = ref(false);

async function scrollLoadEvent(entries, observer, isIntersecting) {
    if (isIntersecting && !this.allLoaded) {
        try {
            loadNextEpisode();
        } catch (error) {
            console.error("Error loading more items:", error);
        }
    }
}

const loadNextEpisode = async () => {
    const newItem = await episodeApi.getEpisodeNext(lastEpisode.value);
    console.log(newItem);
    if (newItem ?? false) {
        itemList.push(newItem);
        lastEpisode.value = newItem.episodeId;
    }
    //  else {
    //     allLoaded.value = true;
    // }
};

//처음 로드
const loadFirstEpisode = async () => {
    const newItem = await episodeApi.getEpisode(props.episodeId);
    if (newItem ?? false) {
        itemList.push(newItem);
    }
    //402 미결제 응답일 때, 결제창 띄우기
    // if (data.payCheck === false) {
    //     payRequired.value = true;
    // }
};

onMounted(() => {
    loadFirstEpisode();
});

//각 에피소드 페이지마다 URL 변경
const urlObversingOptions = (item) => ({
    handler: (entries, observer, isIntersecting) => {
        if (isIntersecting) {
            updateURL(item.episodeId);
        }
    },
    options: {
        threshold: 0.8, // 로더의 80%가 보이면 새 항목을 로드합니다
    },
});

//재렌더링 없이 브라우저 url 바꾸는 메서드
const updateURL = (epiId) => {
    // const router = useRouter();
    // router.push(
    //     {
    //         name: "episode",
    //         params: { novelId: props.novelId, episodeId: epiId },
    //     },
    //     () => {}
    // );
    window.history.replaceState(null, "", `/episodes/${epiId}`);
};
</script>

<style scoped lang="sass"></style>
