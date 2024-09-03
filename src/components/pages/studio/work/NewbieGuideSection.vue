<template>
    <section class="guide-sign">
        <div class="motivate-msg">
            <Sparkle :size="35" class="deco" />
            <h2>작가님의 작품을 기다립니다!</h2>
            <h3>지금 유료로 연재하고 랭킹에 도전하세요!</h3>
        </div>
        <button class="first-create-button" @click="emits('createNovelEvent')">
            <SquarePen /> 신규작품 등록
        </button>
    </section>
</template>

<script setup>
import { SquarePen, Sparkle } from "lucide-vue-next";
import { useRouter } from "vue-router";

const emits = defineEmits(["createNovelEvent"]);
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"

.guide-sign
    display: flex
    flex-flow: row wrap
    justify-content: space-between
    align-items: center

    .motivate-msg
        position: relative

        h2
            display: inline-block
            font-size: 30px
            margin-bottom: 10px
        h3
            font-size: 20px
            color: gray

        .deco
            position: absolute
            top: -20px
            left: -30px

    .first-create-button
        padding: 15px 25px
        border-radius: 5px
        background-color: black
        color: white
        font-size: 15px
        cursor: pointer

        display: flex
        align-items: center
        gap: 10px
</style>
