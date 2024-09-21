<template>
    <nav>
        <ul>
            <li>최근 기록</li>
            <li>별점</li>
            <li>댓글</li>
        </ul>
    </nav>
</template>

<script setup></script>

<style scoped lang="sass">
nav
    background-color: #6159f7
    padding: 0 10px
    width: 60px
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)

    position: fixed
    top: 0
    right: 0
    height: 100%
    z-index: 1000

    ul
        height: 100%
        display: flex
        flex-direction: column
        justify-content: space-around
        align-items: center
        list-style-type: none
        padding: 0

        li
            font-size: 15px
            color: white
            cursor: pointer

// nav > * {
//     color: white;
//     text-decoration: none;
//     transition: color 0.3s;
//     cursor: pointer;
// }

// nav a:hover {
//     color: #818cf8;
// }

// /*
// li {
//     margin: 0 2rem;
//     color: white;
// }
//  */
</style>
