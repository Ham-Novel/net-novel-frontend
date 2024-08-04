<template>
    <article class="item-list">
        <img class="item-cover" src="" />
        <!-- slot으로 재사용화 -->
        <div class="item-info">
            <slot></slot>
            <slot name="feature"></slot>
        </div>
    </article>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
</script>

<style scoped lang="sass">
.item-list
    height: 180px
    position: relative
    display: flex
    flex-flow: row nowrap
    align-items: stretch
    gap: 25px

    .item-cover
        width: 140px
        border-radius: 5px
        background-color: gray

    .item-info
        position: relative
        flex: 1
</style>
