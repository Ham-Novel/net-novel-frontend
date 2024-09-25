<template>
    <div class="novel-sect">
        <button>작품 수정</button>
        <button>작품 삭제</button>
    </div>
</template>

<script setup>
import { inject } from "vue";

const novel = inject("novel");
</script>

<style scoped lang="sass">
.novel-sect
    height: 100%
    display: flex
    flex-flow: column wrap
    align-content: flex-start
    gap: 10px


    button
        padding: 5px 10px
        background-color: var(--bg-main)
        color: var(--text-basic)
        font-weight: 700
        border: 2px solid var(--text-basic)
        border-radius: 5px
        cursor: pointer
</style>
