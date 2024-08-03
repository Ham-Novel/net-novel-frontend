<template>
    <section>
        <div class="base-wrapper base-distance">
            <div class="favorites">
                <NovelBoxItem
                    v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]"
                ></NovelBoxItem>
            </div>
        </div>
    </section>
</template>

<script setup>
import NovelBoxItem from "@/components/reusable/NovelBoxItem.vue";
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"

.favorites
    padding-top: 30px
    display: flex
    flex-flow: row wrap
    gap: 30px
</style>
