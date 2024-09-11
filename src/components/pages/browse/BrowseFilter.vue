<template>
    <section class="novel-filter">
        <div class="filter-header">
            <h1>Filter By</h1>
            <div class="line"></div>
        </div>
        <div class="filter-item-list">
            <span class="filter-item" v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9]">태그</span>
            <input class="filter-input" type="text" value="태그 생성" />
        </div>
    </section>
</template>

<style scoped lang="sass">

.novel-filter
    border-radius: 30px
    border: 5px solid var(--bg-sub)

.filter-header
    margin-bottom: 20px

.filter-item-list
    margin: 0 10px
    display: flex
    flex-flow: row wrap
    gap: 10px

    .filter-item
        padding: 4px 8px
        border: 2px solid var(--line-color)
        border-radius: 12px
        font-size: 12px
        cursor: pointer


.filter-input
    display: inline-block
    width: 100px
    padding: 5px 10px
    border: 2px solid var(--line-color)
    border-radius: 12px
    font-size: 12px

.line
    border-top: 5px solid var(--primary-color)
    border-radius: 5px
    margin: 10px 0px
</style>
