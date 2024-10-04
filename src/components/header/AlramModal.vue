<template>
    <article class="modal"></article>
</template>

<script setup>
import { ref } from 'vue';


const alramList = ref([ {
    
}])

</script>

<style scoped lang="sass">
.modal
    position: absolute
    top: 100%
    transform: translateX(-60%) //width를 기준으로 left 위치 설정
    width: 250px
</style>
