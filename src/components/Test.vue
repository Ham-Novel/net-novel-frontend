<template>
    <main>
        <NovelCardItem>
            <p>asfsdfasdf</p>
            <p>Reprehenderit</p>
        </NovelCardItem>
        <NovelListItem>
            <template v-slot:default>
                <p class="desc">
                    {{ itemInfo.desc }}
                </p>
            </template>
            <template v-slot:feature>
                <div class="item-feature">
                    <button class="continue-reading">
                        {{ itemInfo.progress }}
                        /{{ itemInfo.episodeCount }}
                        이어 읽기 >>
                    </button>
                    <button class="add-library">aaa</button>
                </div>
            </template>
        </NovelListItem>
    </main>
</template>

<script setup>
import NovelCardItem from "./reusable/novel/NovelCardItem.vue";
import NovelListItem from "./reusable/novel/NovelListItem.vue";
import { ref } from "vue";

const itemInfo = ref({
    title: `소설 이름1`,
    desc: `Incididunt cillum cillum deserunt cillum. Aliqua nulla non
                aliquip ut mollit nostrud ea et minim occaecat. Proident irure
                deserunt Lorem laboris quis ex do officia. Reprehenderit
                exercitation occaecat veniam ad officia. Cupidatat mollit
                adipisicing labore laboris. Eu quis ex sint mollit sunt amet do
                eu in sunt. Dolore exercitation do id con;sequat amet dolore
                proident. Minim aliquip adipisicing commodo deserunt. Labore
                excepteur anim sunt sunt magna adipisicing Lorem consectetur.
                Ipsum in cillum incididunt nulla nulla id irure excepteur eu
                nisi amet ipsum.`,
    episodeCount: 100,
    progress: 1,
    isFavorite: false,
});
</script>
