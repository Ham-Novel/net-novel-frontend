<template>
    <section class="episode-section">
        <div class="content-container">
            <p class="content">{{ props.content }}</p>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
    content: {
        type: String,
        default: `
Mollit aliquip amet consequat ipsum fugiat magna. Ex nulla deserunt eu dolore elit aute irure eiusmod tempor. Nulla dolore veniam consequat veniam. Tempor amet elit culpa occaecat. Tempor qui excepteur dolor anim esse fugiat irure irure duis proident voluptate dolore enim. Amet est exercitation exercitation ullamco est nulla ad est dolor ut eiusmod fugiat mollit. Dolore ea sit sint duis amet id minim tempor officia ad nulla.

Voluptate voluptate aliquip ipsum magna aliquip consectetur excepteur et voluptate laboris. Laboris pariatur duis velit amet amet. Elit voluptate adipisicing pariatur sit deserunt elit pariatur voluptate ex fugiat laborum consectetur do tempor. Voluptate aliqua magna officia et magna voluptate ipsum id eiusmod fugiat consequat exercitation. Magna ut quis voluptate ullamco sint dolor eu cupidatat Lorem qui exercitation nisi. Laboris dolor sint culpa ea reprehenderit commodo eiusmod et ex incididunt deserunt nisi eiusmod. Ullamco dolor consectetur commodo sint dolore incididunt in cillum reprehenderit.

Ea irure sit ullamco consequat tempor cupidatat laborum nisi dolor duis esse sit. Quis tempor non aute laborum consequat amet enim occaecat enim esse fugiat ea eiusmod. Enim quis nostrud pariatur ad. Ex non irure reprehenderit exercitation tempor tempor consectetur deserunt ad. Consequat in nulla elit incididunt aliqua dolor aliqua consectetur aliquip.
`,
    },
});

const contents = [];
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"

.episode-section
    background-color: #f0f0f0

    .content-container
        width: 900px
        min-height: 900px
        margin-left: auto
        margin-right: auto
        padding: 10px 60px 100px 60px
        background-color: white

        .content
            font-size: 20px
            line-height: 30px
            white-space: pre-wrap
</style>
