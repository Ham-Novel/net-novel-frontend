<template>
    <section>
        <div class="base-wrapper base-distance">
            <div class="favorites">
                <NovelBoxItem v-for="info in novelInfo" :item-size="itemSize">
                    <h1 class="title">{{ info.title }}</h1>
                    <p class="progress">진행 회차 {{ info.progress }}/100</p>
                </NovelBoxItem>
            </div>
        </div>
    </section>
</template>

<script setup>
import NovelBoxItem from "@/components/reusable/NovelBoxItem.vue";
import { ref } from "vue";

const itemSize = ref({
    width: 160,
    height: 260,
    unit: "px",
});

const novelInfo = ref(
    Array.from({ length: 13 }, (_, i) => {
        return { title: `소설 이름${i}`, progress: i };
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

    .title
        font-size: 18px
        font-weight: bold

    .progress
        font-size: 14px
        color: gray
</style>
