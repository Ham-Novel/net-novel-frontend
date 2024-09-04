<template>
    <section class="user-stats base-wrapper base-distance">
        <div class="stat">
            <span class="value">0.3h</span>
            <span class="label">of Reading</span>
        </div>
        <div class="stat">
            <span class="value">35</span>
            <span class="label">Read books</span>
        </div>
    </section>
    <section class="user-info base-wrapper base-distance">
        <h2 class="title">User Information</h2>
        <p>2021-11-20 Joined</p>
    </section>
</template>

<style lang="sass" scoped>
@use "@/assets/base.sass"
.user-stats
    display: flex
    justify-content: space-around
    background-color: #f9f9f9
    padding: 15px
    border-radius: 10px

.stat
    display: flex
    flex-direction: column
    align-items: center

    .value
        font-size: 18px
        font-weight: bold

    .label
        font-size: 14px
        color: #666

.user-info
    .title
        font-size: 25px
        margin-bottom: 10px
</style>
