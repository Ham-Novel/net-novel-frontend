<template>
    <section class="payment-section">
        <div class="payment-container">
            <div class="pay-check-message">
                <h2 class="payment-warning">미결제 상태입니다. 결제하시겠습니까?</h2>
                <h3 class="payment-fail" v-if="paymentFail">결제 실패! 보유한 코인을 재확인 하십시오!</h3>
            </div>
            <div class="choice-list">
                <!-- <button @click="goBackPage">돌아가기</button> -->
                <button @click="executePayment">{{ props.payment.coinCost }} 코인 결제</button>
            </div>
        </div>
        <slot></slot>
    </section>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { episodeApi } from "@/hooks/backendApi";

const props = defineProps({
    payment: {
        type: Object,
        default: {
            episodeId: 0,
            coinCost: 0,
        },
    },
});
const emits = defineEmits(["reload"]);

const paymentFail = ref(false);

//결제 버튼
async function executePayment() {
    const result = await episodeApi.payForEpisode({
        episodeId: props.payment.episodeId,
        usedCoins: props.payment.coinCost,
    });
    console.log(result);
    if (result === "ok") {
        paymentFail.value = false;
        emits("reload", props.payment.episodeId);
    } else {
        paymentFail.value = true;
    }
}
</script>

<style scoped lang="sass">
@use "@/assets/base.sass"

.payment-section

    .payment-container
        position: relative
        width: 900px
        min-height: 300px
        margin: 0px auto
        padding-top: 30px
        padding-bottom: 100px
        background-color: white
        border-radius: 15px
        border: 5px solid black

        display: flex
        flex-flow: column wrap
        gap: 50px
        justify-content: center


        .pay-check-message

            .payment-warning
                text-align: center
                white-space: nowrap
                font-size: 30px

            .payment-fail
                color: red
                text-align: center

        .choice-list
            display: flex
            flex-flow: row wrap
            justify-content: center
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
