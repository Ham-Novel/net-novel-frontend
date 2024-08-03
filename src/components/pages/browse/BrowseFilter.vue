<template>
    <section class="novel-filter">
        <div class="filter-header">
            <h1>Filter By</h1>
            <div class="line"></div>
        </div>
        <div class="filter-item-list">
            <span
                class="filter-item"
                v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
                >태그</span
            >
            <input class="filter-input" type="text" value="태그 생성" />
        </div>
    </section>
</template>

<style scoped lang="sass">

.filter-header
    margin-bottom: 20px

.filter-item-list
    margin: 0 10px
    display: flex
    flex-flow: row wrap
    gap: 10px

    .filter-item
        padding: 5px 10px
        border: 2px solid #e2e2e2
        border-radius: 12px
        font-size: 14px
        cursor: pointer


.filter-input
    width: 150px
    padding: 5px 10px
    border: 2px solid #e2e2e2
    border-radius: 12px
    font-size: 14px

.line
    border-top: 5px solid gray
    border-radius: 5px
    margin: 10px 0px
</style>
