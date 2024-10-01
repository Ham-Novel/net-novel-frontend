<template>
    <div class="list-info base-wrapper">
        <h2>코인 충전 내역</h2>
        <button class="coin-charge-button" @click="openCoinCharge">코인 충전</button>
    </div>
    <table class="charge-table base-wrapper">
        <thead>
            <tr>
                <th scope="col" class="col-date">날짜</th>
                <th scope="col" class="col-coin">코인</th>
                <th scope="col" class="col-payment">비용</th>
            </tr>
        </thead>
        <tbody>
            <InfiniteScroll v-bind="scrollProps" ref="scrollRef">
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
});

const scrollRef = ref(null);
const reloadScroll = () => {
    scrollRef.value.reset();
};

const ifcoinChargeDialog = ref(false);

const openCoinCharge = () => {
    ifcoinChargeDialog.value = true;
};
const closeCoinCharge = (payment) => {
    if (payment ?? false) {
        reloadScroll();
    }
    ifcoinChargeDialog.value = false;
};
</script>

<style lang="sass" scoped>

.list-info
    padding: 0px 10px
    margin-bottom: 30px
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: flex-end

.charge-table
    border-collapse: collapse
    margin-bottom: 20px
</style>
