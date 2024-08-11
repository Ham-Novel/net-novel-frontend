<template>
    <main>
        <section class="content-wrapper">
            <p>{{ content }}</p>
        </section>
    </main>
</template>

<script setup>
import { ref } from "vue";

const content = ref(`
Mollit aliquip amet consequat ipsum fugiat magna. Ex nulla deserunt eu dolore elit aute irure eiusmod tempor. Nulla dolore veniam consequat veniam. Tempor amet elit culpa occaecat. Tempor qui excepteur dolor anim esse fugiat irure irure duis proident voluptate dolore enim. Amet est exercitation exercitation ullamco est nulla ad est dolor ut eiusmod fugiat mollit. Dolore ea sit sint duis amet id minim tempor officia ad nulla.

Voluptate voluptate aliquip ipsum magna aliquip consectetur excepteur et voluptate laboris. Laboris pariatur duis velit amet amet. Elit voluptate adipisicing pariatur sit deserunt elit pariatur voluptate ex fugiat laborum consectetur do tempor. Voluptate aliqua magna officia et magna voluptate ipsum id eiusmod fugiat consequat exercitation. Magna ut quis voluptate ullamco sint dolor eu cupidatat Lorem qui exercitation nisi. Laboris dolor sint culpa ea reprehenderit commodo eiusmod et ex incididunt deserunt nisi eiusmod. Ullamco dolor consectetur commodo sint dolore incididunt in cillum reprehenderit.

Ea irure sit ullamco consequat tempor cupidatat laborum nisi dolor duis esse sit. Quis tempor non aute laborum consequat amet enim occaecat enim esse fugiat ea eiusmod. Enim quis nostrud pariatur ad. Ex non irure reprehenderit exercitation tempor tempor consectetur deserunt ad. Consequat in nulla elit incididunt aliqua dolor aliqua consectetur aliquip.

Voluptate labore irure minim duis laboris pariatur amet velit ea est ipsum aliqua enim esse. Adipisicing ex ad exercitation adipisicing amet adipisicing consequat reprehenderit pariatur adipisicing minim. Velit incididunt sunt ad ad voluptate nulla deserunt cupidatat voluptate. Officia id sit in sunt minim.

Sunt ea cupidatat incididunt ex. Sint sit et nostrud aliquip velit ad nulla aliqua aliqua. Enim do ipsum adipisicing aliqua aliqua in dolore nisi cillum sunt sint velit eu ut.




`);
</script>

<style scoped lang="sass">
main
    background-color: #e0e0e0

.content-wrapper
    margin-left: auto
    margin-right: auto
    width: 980px
    background-color: white
    padding: 10px 50px


.base-distance
    margin-bottom: 40px
</style>
