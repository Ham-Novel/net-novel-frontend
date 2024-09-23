<template>
    <article>
        <div class="container">
            <h1 class="title">{{ props.payment.title }}</h1>
            <div class="content">
                <div class="message">
                    <h2 class="notice">미결제 상태입니다. 결제하시겠습니까?</h2>
                    <h3 class="payment-fail" v-if="ifPaymentFail">
                        결제 실패! 보유한 코인을 재확인 하십시오!
                    </h3>
                </div>
                <div class="menu">
                    <button @click="executePayment">{{ props.payment.coinCost }}코인 결제</button>
                    <button @click="moveCoinChargePage">코인 충전</button>
                </div>
            </div>
        </div>
        <slot></slot>
    </article>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { episodeApi } from "@/hooks/backendApi";
import { useRouter } from "vue-router";

const props = defineProps({
    payment: {
        type: Object,
        default: {
            episodeId: 0,
            coinCost: 0,
        },
    },
});
const emits = defineEmits(["paymentAccepted"]);

//코인 충전 페이지 이동
const router = useRouter();
function moveCoinChargePage() {
    router.push({ name: "my-payment" });
}

//결제 버튼 클릭
const ifPaymentFail = ref(false);

async function executePayment() {
    const result = await tryPayment();
    if (result) {
        reloadContents(result);
    } else {
        ifPaymentFail.value = true;
    }
}

async function tryPayment() {
    try {
        await episodeApi.payForEpisode({
            episodeId: props.payment.episodeId,
            usedCoins: props.payment.coinCost,
        });
        return true;
    } catch (error) {
        if (error.response.status === 409) {
            console.error("Lack of the coins for payment of epiosde");
        }
        return false;
    }
}

function reloadContents(paymentResult) {
    emits("paymentAccepted", props.payment.episodeId);
}
</script>

<style scoped lang="sass">


article
    .container
        position: relative
        padding-bottom: 100px

        .title
            padding: 30px
            font-size: 35px

        .content
            padding: 50px 60px
            min-height: 400px
            font-size: 20px
            line-height: 30px
            white-space: pre-wrap
            border-top: 5px solid #d0d0d0
            border-bottom: 5px solid #d0d0d0

            display: flex
            flex-flow: column wrap
            justify-content: baseline
            gap: 50px

        .message
            .notice
                text-align: center
                white-space: nowrap
                font-size: 30px

            .payment-fail
                color: red
                text-align: center

        .menu
            display: flex
            flex-flow: row wrap
            justify-content: space-around
            gap: 10px

            button
                background: none
                border: none
                padding: 10px 20px
                border-radius: 5px
                background-color: #6159f7
                color: white
                font-size: 20px
                cursor: pointer
                transition: all 0.3s ease

                &:hover
                    background-color: #2921ca
</style>
