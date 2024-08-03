<template>
    <section class="novel-sort">
        <div class="sort-header">
            <h1>Sort By</h1>
            <div class="line"></div>
        </div>
        <div class="sort-item-list">
            <span
                class="sort-item"
                v-for="item in ['최신순', '추천순', '선작순']"
                >{{ item }}
            </span>
        </div>
    </section>
</template>

<style scoped lang="sass">

.sort-header
    margin-bottom: 20px

.sort-item-list
    margin: 0 10px
    display: flex
    flex-flow: row wrap
    gap: 10px

    .sort-item
        padding: 5px 10px
        border: 2px solid #e2e2e2
        border-radius: 12px
        font-size: 14px
        cursor: pointer


.sort-input
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
