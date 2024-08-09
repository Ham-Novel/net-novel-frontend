<template>
    <section>
        <div class="base-wrapper base-distance">
            <div class="favorites">
                <template v-for="info in novelInfo">
                    <NovelCardItem
                        :size="itemSize"
                        :brief="{ id: info.id, title: info.title }"
                    >
                        <p class="progress">
                            진행 회차 {{ info.progress }}/100
                        </p>
                    </NovelCardItem>
                </template>
            </div>
        </div>
    </section>
</template>

<script setup>
import NovelCardItem from "@/components/reusable/novel/NovelCardItem.vue";
import { ref } from "vue";

//NovelCardItem 크기 제작
const itemSize = ref({
    width: "160px",
    height: "260px",
});

//선호작 작품들 더미 데이터 생성
const novelInfo = ref(
    Array.from({ length: 13 }, (_, i) => {
        return {
            id: i + 1,
            title: `소설 이름${i + 1}`,
            progress: i + 1,
            id: i + 1,
        };
    })
);
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"

.favorites
    padding-top: 30px
    display: flex
    flex-flow: row wrap
    gap: 20px

    .progress
        font-size: 14px
        color: gray
</style>
