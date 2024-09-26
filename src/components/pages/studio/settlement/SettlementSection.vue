<template>
    <section>
        <section class="settlement-request base-wrapper">
            <h5>작품 수익 정산</h5>
            <template v-if="worksProfitList.length !== 0">
                <h6>
                    {{ worksProfitList[0].settlementStartDate }} ~
                    {{ worksProfitList[0].settlementEndDate }}
                </h6>
                <table class="striped">
                    <thead>
                        <tr>
                            <th scope="col">작품명</th>
                            <th scope="col">결제 코인</th>
                            <th scope="col">수익</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="profit in worksProfitList" :key="profit.novelId">
                            <tr>
                                <th scope="row">{{ profit.novelTitle }}</th>
                                <td>{{ profit.totalCoins }}</td>
                                <td>{{ convertCoinToBill(profit.totalCoins) }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <button @click="requestSettlement">정산 신청</button>
            </template>
        </section>
        <section class="settlement-result base-wrapper">
            <h5>정산 처리 내역</h5>
            <table class="striped" v-if="settlementResultList !== 0">
                <thead>
                    <tr>
                        <th scope="col">작품명</th>
                        <th scope="col">정산 금액</th>
                        <th scope="col">시작 일자</th>
                        <th scope="col">끝 일자</th>
                        <th scope="col">처리 일자</th>
                        <th scope="col">처리 상태</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="settlement in settlementResultList" :key="settlement.novelId">
                        <tr>
                            <th scope="row">{{ settlement.novelTitle }}</th>
                            <td>{{ settlement.revenue }}</td>
                            <td>{{ settlement.settlementStartDate }}</td>
                            <td>{{ settlement.settlementEndDate }}</td>
                            <td>{{ settlement.settlementExecuteDate }}</td>
                            <td>{{ settlement.settlementStatus }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </section>
    </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { memberApi } from "@/hooks/backendApi";

onMounted(() => {
    loadWorksRevenue();
    loadSettlementResult();
});

const worksProfitList = ref([]);

async function loadWorksRevenue() {
    const data = await memberApi.getWorksSettlement();
    worksProfitList.value.push(...data);
}

function requestSettlement() {
    memberApi.requestSettlement();
}

const settlementResultList = ref([]);

async function loadSettlementResult() {
    const data = await memberApi.getSettlementResult();
    settlementResultList.value.push(...data);
}

function convertCoinToBill(coins) {
    return coins * 100;
}
</script>

<style scoped lang="sass">

section
    margin-bottom: 3rem

.settlement-result
    font-size: 0.8rem

button
    width: 100%
    height: 40px
</style>
