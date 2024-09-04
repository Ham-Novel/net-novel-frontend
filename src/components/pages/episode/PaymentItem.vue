<template>
    <article class="payment-section">
        <div class="payment-container">
            <h1 class="episode-title">{{ props.payment.title }}</h1>
            <div class="pay-check-message">
                <h2 class="payment-warning">미결제 상태입니다. 결제하시겠습니까?</h2>
                <h3 class="payment-fail" v-if="paymentFail">
                    결제 실패! 보유한 코인을 재확인 하십시오!
                </h3>
            </div>
            <div class="choice-list">
                <!-- <button @click="goBackPage">돌아가기</button> -->
                <button @click="executePayment">{{ props.payment.coinCost }} 코인 결제</button>
            </div>
        </div>
        <slot></slot>
    </article>
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
        emits("reload");
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
        min-height: 600px
        margin: 0px auto
        padding-top: 30px
        padding-bottom: 100px
        background-color: white
        border-radius: 15px
        border-bottom: 5px solid #d0d0d0
        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4)

        display: flex
        flex-flow: column wrap
        gap: 50px
        justify-content: baseline

        .episode-title
            padding: 0 30px
            padding-bottom: 20px
            margin-bottom: 20px
            border-bottom: 5px solid #d0d0d0
            font-size: 35px

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
