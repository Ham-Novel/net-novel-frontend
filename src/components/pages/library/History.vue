<template>
    <section>
        <div class="base-wrapper base-distance">
            <div class="favorites">
                <NovelListItem
                    v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]"
                ></NovelListItem>
            </div>
        </div>
    </section>
</template>

<script setup>
import NovelListItem from "@/components/reusable/NovelListItem.vue";
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"

.favorites
    padding-top: 30px
    display: flex
    justify-content: flex-start
    flex-flow: column wrap
    gap: 30px
</style>
