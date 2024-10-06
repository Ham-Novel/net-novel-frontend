<template>
    <li>
        <button class="outline" @click="clickMenu">
            <component :is="icon" size="28" stroke-width="2.5"></component>
            {{ name }}
        </button>
        <component v-if="isOpenModal" :is="modal" @close="closeModal"></component>
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
});

const router = useRouter();

function clickMenu() {
    if (props.modal) {
        openModal();
        return;
    }
    goLink();
}

function goLink() {
    router.push(props.link);
}

const isOpenModal = ref(false);
async function openModal() {
    //모달이 열리는 동시에 해당 클릭이 외부 클릭 이벤트로 감지하지 못하게 설정
    await new Promise((r) => setTimeout(r, 1));
    isOpenModal.value = true;
}

function closeModal() {
    isOpenModal.value = false;
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
