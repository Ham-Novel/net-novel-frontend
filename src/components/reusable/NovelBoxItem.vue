<template>
    <article class="novel-box-item">
        <img class="novel-cover" src="" />
        <div class="novel-info">
            <h1 class="title">소설 이름</h1>
            <p class="progress">진행 회차 5/100</p>
        </div>
    </article>
</template>

<style scoped lang="sass">
.novel-box-item
    width: 160px
    height: 260px
    display: flex
    flex-direction: column
    align-items: stretch
    gap: 10px

.novel-cover
    flex: 6
    border-radius: 5px
    background-color: gray

.novel-info
    flex: 2
    display: flex
    flex-direction: column
    justify-content: flex-start
    gap: 5px

    .title
        font-size: 18px
        font-weight: bold

    .progress
        font-size: 14px
        color: gray
</style>
