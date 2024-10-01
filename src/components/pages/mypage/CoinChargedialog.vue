<template>
    <teleport to="#app">
        <dialog open>
            <article>
                <button class="exit-button" @click="emits('closeDialog', false)">
                    <X size="24" color="white" />
                </button>
                <section class="header">
                    <h3>코인 충전</h3>
                </section>
                <section class="account">
                    <h4>보유 코인</h4>
                    <span><HandCoins size="20" />{{ coinCount }}</span>
                </section>
                <section class="goods">
                    <h4>충전 상품</h4>
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
                    <h4>결제 금액</h4>
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
                    <h3 v-if="failMessage.length !== 0" class="payement-fail-msg">
                        {{ failMessage }}
                    </h3>
                </section>
            </article>
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
    padding: 2px
    border: none


article
    position: fixed
    top: 48%
    left: 50%
    transform: translate(-50%, -50%)
    width: 400px
    z-index: 1001
    overflow: hidden

    display: flex
    flex-flow: column nowrap
    justify-content: center
    gap: 10px

    h4,h3
        margin-bottom: 0.7rem

    section
        margin: 0
        padding: 10px
        border-radius: 10px
        box-shadow: var(--pico-box-shadow)

        span
            display: inline-flex
            align-items: center
            gap: 5px
            vertical-align: top

    .goods
        ul
            margin: 0px
            padding: 0 10px
            list-style: none

            display: flex
            flex-flow: column wrap
            gap: 5px

            label
                display: flex
                justify-content: space-between
                font-size: 18px

                input
                    width: 20px
                    height: 20px
    .payment

        p
            margin-bottom: 10px
            padding-bottom: 5px
            border-bottom: 2px solid black

            display: flex
            align-items: center
            justify-content: space-between

            span
                font-size: 1.3rem
                font-weight: bold

        label
            display: block
            margin-bottom: 10px
            font-size: 0.8rem

        button
            padding: 10px
            width: 100%
            border-radius: 10px
            border: none
            color: white
            font-size: 16px

.payement-fail-msg
    margin: 5px 0
    text-align: center
    font-size: 16px
    color: red
    white-space: pre-line


input
    display: inline
</style>
