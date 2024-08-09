<template>
    <section>
        <div class="base-wrapper base-distance">
            <div class="histories">
                <NovelListItem v-for="itemInfo in itemInfoList">
                    <template v-slot:default>
                        <div class="novel-info">
                            <p class="desc">
                                {{ itemInfo.desc }}
                            </p>
                        </div>
                    </template>
                    <template v-slot:feature>
                        <div class="item-feature">
                            <button class="continue-reading">
                                {{ itemInfo.progress }}
                                /{{ itemInfo.episodeCount }}
                                이어 읽기 >>
                            </button>
                            <button class="add-library">
                                {{ isFavoriteMsg(itemInfo) }}
                            </button>
                        </div>
                    </template>
                </NovelListItem>
            </div>
        </div>
    </section>
</template>

<script setup>
import NovelListItem from "@/components/reusable/novel/NovelListItem.vue";
import { ref, computed } from "vue";

const itemInfoList = ref(
    Array.from({ length: 10 }, (_, i) => {
        return {
            title: `소설 이름${i}`,
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
            progress: i,
            isFavorite: false,
        };
    })
);

const isFavoriteMsg = (itemInfo) => {
    if (itemInfo.isFavorite) {
        return "-선호작";
    } else {
        return "+선호작";
    }
};
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"

.histories
    padding-top: 30px
    display: flex
    justify-content: flex-start
    flex-flow: column wrap
    gap: 30px


    .novel-info
        position: relative

        .title
            height: 30px
            margin-bottom: 5px
            font-size: 24px
            font-weight: bold

        .desc
            max-height: 80px
            font-size: 16px
            overflow: hidden
            overflow-wrap: break-word
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 3 /* 표시할 줄 수 */
            -webkit-box-orient: vertical

        .progress
            position: absolute
            bottom: 10px
            height: 30px
            font-size: 16px
            color: gray

.item-feature
    position: absolute
    bottom: 10px
    right: 10px
    display: flex
    flex-flow: row wrap
    gap: 30px

    .continue-reading
        background: none
        border: none
        cursor: pointer

    .add-library
        background: none
        border: none
        height: 40px
        padding: 0 30px
        border-radius: 20px
        background-color: #e6e6fa
        cursor: pointer
</style>
