<template>
    <article class="modal" ref="modalRef">
        <div class="alram-list">
            <template v-for="item in alramList" :key="item.episodeId">
                <ListItem
                    class="alram-item"
                    :id="item.novelId"
                    :cover-img="item.thumbnailFileName"
                    :custom="true"
                >
                    <template #default>
                        <div class="detail">
                            <h4 class="novel-title" @click="goToNovel(item.novelId)">
                                {{ item.novelTitle }}
                            </h4>
                            <p
                                class="episode-title"
                                @click="goToEpisode(item.novelId, item.episodeId)"
                            >
                                {{ item.episodeTitle }}
                            </p>
                        </div>
                    </template>
                </ListItem>
            </template>
        </div>
    </article>
</template>

<script setup>
import { useRouter } from "vue-router";
import ListItem from "../reusable/novel/ListItem.vue";
import { ref } from "vue";
import { onClickOutside } from "@/hooks/onClickOutside";

const alramList = ref([
    {
        novelId: 1,
        episodeId: 1,
        novelTitle: "작품",
        episodeTitle: "에피소드",
        thumbnailFileName: undefined,
    },
    {
        novelId: 1,
        episodeId: 1,
        novelTitle: "작품2",
        episodeTitle: "에피소드2",
        thumbnailFileName: undefined,
    },
    {
        novelId: 1,
        episodeId: 1,
        novelTitle: "작품1",
        episodeTitle: "에피소드2",
        thumbnailFileName: undefined,
    },
]);

const emits = defineEmits(["close"]);

const router = useRouter();

function goToNovel(novelId) {
    router.push({ name: "novel", params: { novelId } });
}
function goToEpisode(novelId, episodeId) {
    router.push({ name: "episode", params: { novelId, episodeId } });
}

//모달 바깥 클릭시 모달 닫기
const modalRef = ref(null);
const closeModal = () => {
    emits("close");
};
onClickOutside(modalRef, closeModal);
</script>

<style scoped lang="sass">
.modal
    position: absolute
    top: 100%
    transform: translateX(-60%) //width를 기준으로 left 위치 설정
    width: 250px
    padding: 0

.alram-list
    display: flex
    flex-flow: column wrap
    gap: 5px

    .alram-item
        height: 70px

        .detail
            height: 100%
            display: flex
            flex-flow: column wrap
            justify-content: center
            gap: 5px

            .novel-title
                font-size: 0.8rem
            .episode-title
                font-size: 0.7rem
</style>
