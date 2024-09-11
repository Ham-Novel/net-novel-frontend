<template>
    <section class="novel-sort">
        <div class="sort-header">
            <h1>Sort By</h1>
            <div class="line"></div>
        </div>
        <div class="sort-item-list">
            <span class="sort-item" v-for="item in ['최신순', '추천순', '선작순']"
                >{{ item }}
            </span>
        </div>
    </section>
</template>

<style scoped lang="sass">

.novel-sort
    border-radius: 30px
    border: 5px solid var(--bg-sub)

.sort-header
    margin-bottom: 20px

    h1
        font-size: 18px
        font-weight: 700

.sort-item-list
    margin: 0 10px
    display: flex
    flex-flow: row wrap
    gap: 10px

    .sort-item
        padding: 4px 8px
        border: 2px solid var(--line-color)
        border-radius: 12px
        font-size: 12px
        cursor: pointer

.line
    border-top: 5px solid var(--primary-color)
    border-radius: 5px
    margin: 10px 0px
</style>
