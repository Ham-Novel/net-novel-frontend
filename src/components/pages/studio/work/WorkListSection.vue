<template>
    <section class="work-list base-wrapper">
        <template v-for="novel in props.novelList">
            <WorkListItem
                :novel="novel"
                @create-episode-event="goToEpisodeCreatePage"
            ></WorkListItem>
        </template>
    </section>
</template>

<script setup>
import WorkListItem from "./WorkListItem.vue";

import { useRouter } from "vue-router";

const props = defineProps({
    novelList: {
        type: Array,
        requierd: true,
    },
});

const router = useRouter();

function goToEpisodeCreatePage(novelId) {
    router.push({ name: "episode-create", params: { id: novelId } });
}
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"

.work-list
    position: relative
    display: flex
    flex-flow: column wrap
    gap: 10px
</style>
