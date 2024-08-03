<template>
    <main>
        <section class="top300 base-distance">
            <div class="ranking-wrapper base-wrapper">
                <h1 class="ranking-title">Top 300</h1>
                <div class="ranking-list">
                    <NovelBoxItem v-for="i in 100"></NovelBoxItem>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import NovelBoxItem from "@/components/reusable/NovelBoxItem.vue";
</script>

<style scoped lang="sass">
@use '@/assets/base.sass'

.ranking-wrapper
    margin-top: 30px

.ranking-title
    margin-bottom: 10px
    font-size: 25px

.ranking-list
    display: flex
    flex-flow: row wrap
    gap: 4px
</style>
