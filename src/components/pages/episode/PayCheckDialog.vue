<template>
    <teleport to="body">
        <div>
            <div class="overlay"></div>
            <dialog open>
                <div class="pay-check-message">
                    <h2 class="payment-warning">
                        미결제 상태입니다. 결제하시겠습니까?
                    </h2>
                    <h3 class="payment-fail" v-if="paymentFail">
                        결제 실패! 보유한 코인을 재확인 하십시오!
                    </h3>
                </div>
                <div class="choice-list">
                    <button @click="goBackPage">돌아가기</button>
                    <button @click="executePayment">
                        {{ costPolicy.name }} {{ costPolicy.coinCost }}코인 결제
                    </button>
                </div>
            </dialog>
        </div>
    </teleport>
</template>

<script setup>
import { episodeApi } from "@/backendApi";
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(["episodeId", "costPolicy", "activate"]);
const emits = defineEmits(["update:activate"]);
const paymentFail = ref(false);

//해당 컴포넌트가 활성화된 동안 스크롤 불가
onMounted(() => {
    document.body.style.overflow = "hidden";
});
onUnmounted(() => {
    document.body.style.overflow = "";
});

//돌아가기 버튼
const router = useRouter();
function goBackPage() {
    router.back();
}

//결제 버튼
function executePayment() {
    episodeApi
        .payForEpisode({
            episodeId: props.episodeId,
            usedCoins: props.costPolicy.coinCost,
        })
        .then((result) => {
            console.log(result);
            if (result === "ok") {
                emits("update:activate", false);
                paymentFail.value = false;
            } else {
                paymentFail.value = true;
            }
        });
}
</script>

<style scoped lang="sass">
dialog
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    z-index: 1000
    padding: 20px 50px
    box-shadow: 0 2px 5px black

    .pay-check-message
        margin-bottom: 30px

        .payment-warning
            text-align: center
            white-space: nowrap

        .payment-fail
            color: red
            text-align: center

    .choice-list
        display: flex
        flex-flow: row wrap
        justify-content: space-between
        gap: 10px

        button
            background: none
            border: none
            padding: 5px 10px
            border-radius: 5px
            background-color: #6159f7
            color: white
            font-size: 15px
            cursor: pointer
            transition: all 0.3s ease

            &:hover
                background-color: #2921ca
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
