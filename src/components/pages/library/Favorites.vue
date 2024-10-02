<template>
    <section>
        <div class="base-wrapper base-distance">
            <div class="favorites">
                <template v-for="favorite in favorites.list" :key="favorite.id">
                    <CardItem
                        :id="favorite.id"
                        :title="favorite.title"
                        :author="favorite.authorName"
                        :cover-img="favorite.thumbnailUrl"
                        :tags="favorite.tags"
                    >
                        <template #cover>
                            <p class="status">{{ displayType(favorite.novelType) }}</p>
                        </template>
                    </CardItem>
                </template>
            </div>
        </div>
    </section>
</template>

<script setup>
import CardItem from "@/components/reusable/novel/CardItem.vue";
import { onMounted, reactive, ref, computed } from "vue";
import { favoriteApi } from "@/hooks/backendApi";

//선호작 데이터 저장 변수
const favorites = reactive({
    list: [],
    loadMethod: async () => {
        const novels = await favoriteApi.getFavorites();
        favorites.list.push(...novels);
        console.log(novels);
    },
});

//페이지 로드 시 실행
onMounted(() => {
    favorites.loadMethod();
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
</script>

<style scoped lang="sass">


.favorites
    padding-top: 30px
    display: flex
    flex-flow: row wrap
    gap: 25px

    .author
        font-size: 14px
        color: gray

.status
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
