<template>
    <div class="list-info base-wrapper">
        <h2>코인 충전 내역</h2>
        <button class="coin-charge-button" @click="openCoinCharge">코인 충전</button>
    </div>
    <table class="charge-table base-wrapper">
        <!-- <colgroup>
            <col class="col-date" />
            <col class="col-coin" />
            <col class="col-payment" />
        </colgroup> -->
        <thead>
            <tr>
                <th class="col-date">날짜</th>
                <th class="col-coin">코인</th>
                <th class="col-payment">비용</th>
            </tr>
        </thead>
        <tbody>
            <InfiniteScroll v-bind="scrollProps">
                <template v-slot:default="{ item }">
                    <ChargeHistoryItem v-bind="item"></ChargeHistoryItem>
                </template>
            </InfiniteScroll>
        </tbody>
    </table>
    <CoinChargedialog v-if="ifcoinChargeDialog" @close-dialog="closeCoinCharge"></CoinChargedialog>
</template>

<script setup>
import ChargeHistoryItem from "./ChargeHistoryItem.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";
import CoinChargedialog from "./CoinChargedialog.vue";

import { reactive, ref } from "vue";
import { coinApi } from "@/hooks/backendApi";

//스크롤 페이지 로드 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 10 },
    loadMethod: async (page, size) => {
        const loaded = await coinApi.getChargeHistory(page, size);
        return loaded;
    },
    loadingMessage: "History Loading...",
});

const ifcoinChargeDialog = ref(false);

const openCoinCharge = () => {
    ifcoinChargeDialog.value = true;
};
const closeCoinCharge = () => {
    ifcoinChargeDialog.value = false;
};
</script>

<style lang="sass" scoped>
@use '@/assets/base.sass'

.list-info
    padding: 0px 10px
    margin-bottom: 30px
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: flex-end

    .coin-charge-button
        padding: 15px
        border-radius: 5px
        border: 2px solid black
        background-color: white
        font-weight: bold
        font-size: 15px
        transition: all 0.3s ease

        &:hover
            background-color: #e0e0e0

.charge-table
    border-collapse: collapse
    margin-bottom: 20px

    thead th
        background-color: rgb(247, 251, 255)
        font-weight: bold
        padding: 12px
        font-size: 18px
        border-bottom: 2px solid black
        border-top: 2px solid black
        border-right: 2px solid black

    :deep(.col-date)
        text-align: left
        width: 30%

    :deep(.col-coin)
        text-align: right
        width: 30%

    :deep(.col-payment)
        text-align: right
        width: 30%
</style>
