<template>
    <section class="episode-section">
        <div class="content-container">
            <h1 class="title">{{ props.episode.title }}</h1>
            <p class="content">{{ props.episode.content }}</p>
            <slot></slot>
        </div>
    </section>
</template>

<script setup>
import PayCheckDialog from "./PayCheckDialog.vue";

import { onMounted, reactive, ref } from "vue";

const props = defineProps({
    episode: {
        type: Object,
        default: {
            episodeId: 0,
            title: "Title",
            content: `
Mollit aliquip amet consequat ipsum fugiat magna. Ex nulla deserunt eu dolore elit aute irure eiusmod tempor. Nulla dolore veniam consequat veniam. Tempor amet elit culpa occaecat. Tempor qui excepteur dolor anim esse fugiat irure irure duis proident voluptate dolore enim. Amet est exercitation exercitation ullamco est nulla ad est dolor ut eiusmod fugiat mollit. Dolore ea sit sint duis amet id minim tempor officia ad nulla.

Voluptate voluptate aliquip ipsum magna aliquip consectetur excepteur et voluptate laboris. Laboris pariatur duis velit amet amet. Elit voluptate adipisicing pariatur sit deserunt elit pariatur voluptate ex fugiat laborum consectetur do tempor. Voluptate aliqua magna officia et magna voluptate ipsum id eiusmod fugiat consequat exercitation. Magna ut quis voluptate ullamco sint dolor eu cupidatat Lorem qui exercitation nisi. Laboris dolor sint culpa ea reprehenderit commodo eiusmod et ex incididunt deserunt nisi eiusmod. Ullamco dolor consectetur commodo sint dolore incididunt in cillum reprehenderit.`,
        },
    },
});
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"

.episode-section

    .content-container
        position: relative
        width: 900px
        min-height: 900px
        margin: 0px auto
        padding-top: 30px
        padding-bottom: 100px
        background-color: white
        border-radius: 15px
        border-bottom: 5px solid #d0d0d0
        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4)

        .title
            padding: 0 30px
            padding-bottom: 20px
            margin-bottom: 20px
            border-bottom: 5px solid #d0d0d0
            font-size: 35px

        .content
            padding: 0 60px
            font-size: 20px
            line-height: 30px
            white-space: pre-wrap
</style>
