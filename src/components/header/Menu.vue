<template>
    <li>
        <button class="outline" @click="clickMenu">
            <component :is="icon" size="28" stroke-width="2.5"></component>
            {{ name }}
        </button>
        <component v-if="isOpenModal" :is="modal" @close="toggleModal"></component>
    </li>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    name: {
        type: String,
        default: "",
    },
    icon: {
        default: undefined,
    },
    link: {
        type: Object,
        default: { name: "not-found" },
    },
    modal: {
        default: undefined,
    },
    openModal: {
        type: Boolean,
        default: false,
    },
});

const router = useRouter();

function clickMenu() {
    if (props.modal) {
        toggleModal();
        return;
    }
    goLink();
}

function goLink() {
    router.push(props.link);
}

const isOpenModal = ref(props.openModal);
function toggleModal() {
    isOpenModal.value = !isOpenModal.value;
}
</script>

<style scoped lang="sass">
li
    position: relative
    padding: 0

button
    padding: 0.3rem
    border: none
    font-size: 0.9rem
    color: var(--pico-text-color)

    display: flex
    align-items: center
    gap: 3px

    &:hover
        color: var(--pico-primary)
</style>
