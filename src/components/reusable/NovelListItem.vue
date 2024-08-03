<template>
    <article class="novel-list-item">
        <img class="novel-cover" src="" />
        <!-- slot으로 재사용화 -->
        <div class="novel-info">
            <h1 class="title">소설 이름</h1>
            <p class="desc">
                Incididunt cillum cillum deserunt cillum. Aliqua nulla non
                aliquip ut mollit nostrud ea et minim occaecat. Proident irure
                deserunt Lorem laboris quis ex do officia. Reprehenderit
                exercitation occaecat veniam ad officia. Cupidatat mollit
                adipisicing labore laboris. Eu quis ex sint mollit sunt amet do
                eu in sunt. Dolore exercitation do id consequat amet dolore
                proident. Minim aliquip adipisicing commodo deserunt. Labore
                excepteur anim sunt sunt magna adipisicing Lorem consectetur.
                Ipsum in cillum incididunt nulla nulla id irure excepteur eu
                nisi amet ipsum.
            </p>
            <p class="progress">진행 회차 5/100</p>
        </div>
        <div class="item-feature">
            <button class="continue-reading">이어 읽기 >></button>
            <button class="add-library">+선호작</button>
        </div>
    </article>
</template>

<style scoped lang="sass">
.novel-list-item
    height: 180px
    position: relative
    display: flex
    flex-flow: row nowrap
    align-items: stretch
    gap: 25px

    .novel-cover
        width: 140px
        border-radius: 5px
        background-color: gray

    .novel-info
        flex: 1

        .title
            height: 30px
            margin-bottom: 5px
            font-size: 24px
            font-weight: bold

        .desc
            max-height: 80px
            font-size: 16px
            overflow: hidden
            overflow-wrap: break-word
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 3 /* 표시할 줄 수 */
            -webkit-box-orient: vertical

        .progress
            position: absolute
            bottom: 10px
            height: 30px
            font-size: 16px
            color: gray

.item-feature
    position: absolute
    bottom: 10px
    right: 10px
    display: flex
    flex-flow: row wrap
    gap: 30px

    .continue-reading
        background: none
        border: none
        cursor: pointer

    .add-library
        background: none
        border: none
        height: 40px
        padding: 0 30px
        border-radius: 20px
        background-color: #e6e6fa
        cursor: pointer
</style>
