<template>
    <teleport to="#app">
        <div class="overlay"></div>
        <dialog open>
            <button class="exit-button" @click="emits('closeDialog', false)">
                <X size="100%" color="white" />
            </button>
            <section class="header">
                <h1>코인 충전</h1>
            </section>
            <section class="account">
                <h2>보유 코인</h2>
                <span><HandCoins size="20" />{{ coinCount }}</span>
            </section>
            <section class="goods">
                <h2>충전 상품</h2>
                <ul>
                    <template v-for="goods in goodsList" :key="goods.id">
                        <label :for="'goods' + goods.id">
                            <span>
                                <input
                                    type="radio"
                                    :id="'goods' + goods.id"
                                    name="goods"
                                    :value="{
                                        coinAmount: goods.coinAmount,
                                        payment: goods.payment,
                                    }"
                                    v-model="selectedGoods"
                                />
                                <BadgeCent size="20" />
                                {{ goods.coinAmount }}
                            </span>
                            <span>{{ goods.payment }}원</span>
                        </label>
                    </template>
                </ul>
            </section>
            <section class="payment">
                <h2>결제 금액</h2>
                <p>
                    <span></span>
                    <span>{{ selectedGoods.payment }}<Banknote size="30" /></span>
                </p>
                <label for="condition-agree">
                    <input
                        type="checkbox"
                        id="condition-agree"
                        value="agree"
                        name="condition-agree"
                    />
                    <span>결제 약관에 동의합니다.</span>
                </label>
                <button @click="coinCharge">결제</button>
                <h3 v-if="failMessage.length !== 0" class="payement-fail-msg">{{ failMessage }}</h3>
            </section>
        </dialog>
    </teleport>
</template>

<script setup>
import { HandCoins, BadgeCent, Banknote, X } from "lucide-vue-next";

import { coinApi } from "@/hooks/backendApi";
import { computed, reactive, ref } from "vue";

const emits = defineEmits(["closeDialog"]);

const coinCount = ref(100);
const selectedGoods = ref({ coinAmount: 0, payment: 0 });
const failMessage = ref("");

const goodsList = reactive([
    { id: 1, coinAmount: 1, payment: 1000 },
    { id: 2, coinAmount: 10, payment: 10000 },
    { id: 3, coinAmount: 100, payment: 100000 },
]);

const coinCharge = async () => {
    try {
        const resp = await coinApi.chargeCoins({ ...selectedGoods.value });
        emits("closeDialog", true);
    } catch (error) {
        if (error.response.status === 401) {
            failMessage.value = "로그인 세션이 만료되었습니다.\n재로그인 하십시오.";
        } else if (error.response.status === 400) {
            failMessage.value = "결제를 실패하였습니다!\n누락한 입력이 없는지 확인하십시오.";
        }
    }
};
</script>

<style scoped lang="sass">

.exit-button
    position: absolute
    top: 15px
    right: 15px

    width: 25px
    height: 25px

    border-radius: 5px
    border: none
    background-color: #6159f7
    &:hover
        background-color: #2921ca


dialog
    position: fixed
    top: 50%
    left: 50%
    width: 400px
    transform: translate(-50%, -50%)
    z-index: 1001

    padding: 20px
    border-radius: 30px
    border: 0px solid black
    background-color: #eef
    box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.4)

    display: flex
    flex-flow: column wrap
    justify-content: center
    gap: 10px

    section
        padding: 10px
        border-radius: 10px
        background-color: white

        h1
            padding-left: 5px
            font-size: 25px

        h2
            padding: 5px
            font-size: 20px
            margin-bottom: 5px

        span
            display: inline-flex
            align-items: center
            gap: 5px
            vertical-align: top


    .account
        span
            line-height: 20px
            font-size: 18px

    .goods
        ul
            margin: 0px 10px
            list-style: none

            display: flex
            flex-flow: column wrap
            gap: 5px

            label
                display: flex
                justify-content: space-between
                font-size: 18px
    .payment

        p
            margin-bottom: 10px
            padding-bottom: 5px
            border-bottom: 2px solid black
            font-size: 16px

            display: flex
            align-items: center
            justify-content: space-between

            span
                font-size: 24px
                font-weight: bold

        label
            display: block
            margin-bottom: 10px

        button
            padding: 10px
            width: 100%
            border-radius: 10px
            border: none
            background-color: #6159f7
            color: white
            font-size: 16px

            &:hover
                background-color: #2921ca

.payement-fail-msg
    margin: 5px 0
    text-align: center
    font-size: 16px
    color: var(--error-color)
    white-space: pre-line


input
    display: inline

.overlay
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 1000
    background: rgba(0, 0, 0, 0.2)
    backdrop-filter: blur(2px)
</style>
