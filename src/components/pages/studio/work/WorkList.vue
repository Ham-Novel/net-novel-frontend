<template>
    <section class="work-list base-wrapper">
        <template v-for="novel in props.novelList">
            <WorkListItem :novel="novel"></WorkListItem>
            <div class="line"></div>
        </template>
    </section>
</template>

<script setup>
import WorkListItem from "./item/WorkListItem.vue";

import { useRouter } from "vue-router";

const props = defineProps({
    novelList: {
        type: Array,
        requierd: true,
    },
});
</script>

<style scoped lang="sass">

.work-list
    position: relative
    display: flex
    flex-flow: column wrap

.line
    border-top: 2px solid var(--line-color)
    width: 100%
    margin: 10px 0px
</style>
