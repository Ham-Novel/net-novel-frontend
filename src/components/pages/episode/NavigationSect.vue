<template>
    <aside>
        <nav>
            <ul>
                <li><List size="30" /></li>
                <li><MessageSquareMore size="30" /></li>
                <li><Info size="30" /></li>
            </ul>
        </nav>
    </aside>
</template>

<script setup>
import { List, MessageSquareMore, Info } from "lucide-vue-next";
</script>

<style scoped lang="sass">
aside
    position: fixed
    top: 0
    right: 0
    -webkit-transform: translateZ(0)
    z-index: 100

    width: 80px
    height: 100%

    background-color: var(--pico-background-color)
    border-left: 1px solid var(--pico-muted-border-color)
    box-shadow: var(--pico-box-shadow)

    nav
        height: 100%

ul
    height: 100%
    display: flex
    flex-flow: column wrap
    justify-content: center
    gap: 10%

//     ul
//         height: 100%
//         display: flex
//         flex-direction: column
//         justify-content: space-around
//         align-items: center
//         list-style-type: none
//         padding: 0

//         li
//             font-size: 15px
//             color: white
//             cursor: pointer
</style>
