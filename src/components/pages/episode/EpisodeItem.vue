<template>
    <article>
        <div class="content-container">
            <h1 class="title">{{ props.episode.title }}</h1>
            <p class="content">{{ props.episode.content }}</p>
        </div>
        <slot></slot>
    </article>
</template>

<script setup>
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

article
    position: relative
    min-height: 800px
    box-shadow: none

    .content-container
        position: relative
        padding-bottom: 100px

        .title
            padding: 30px
            font-size: 35px

        .content
            padding: 0 60px
            font-size: 20px
            line-height: 30px
            white-space: pre-wrap
</style>
