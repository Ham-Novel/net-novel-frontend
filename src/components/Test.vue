<template>
    <div>
        <template v-for="n in 100">
            <ListItem :brief="brief" :link="link"></ListItem>
            <!-- <CardItem :brief="brief"></CardItem> -->
            <!-- <BaseItem></BaseItem> -->
        </template>
    </div>
</template>

<script setup>
import ListItem from "./reusable/novel/ListItem.vue";
import CardItem from "./reusable/novel/CardItem.vue";
import BaseItem from "./reusable/novel/BaseItem.vue";
const brief = {
    title: "ListItem",
    coverImg: "/cover/fantasy_cover.jpeg",
};

const link = { name: "novel", params: { id: 1 } };
</script>

<style scoped lang="sass">
div
    width: 900px
    padding: 30px
    display: flex
    flex-flow: column wrap
    align-items: baseline
    gap: 10px
</style>
