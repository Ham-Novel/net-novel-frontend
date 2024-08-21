<template>
    <teleport to="body">
        <div class="overlay"></div>
        <dialog open>
            <h2>결제하시겠습니까?</h2>
        </dialog>
    </teleport>
</template>

<style scoped lang="sass">

dialog
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    z-index: 1000
    padding: 20px 50px
    box-shadow: 0 2px 5px black

.overlay
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.2)
    backdrop-filter: blur(3px)
    z-index: 1000
</style>
