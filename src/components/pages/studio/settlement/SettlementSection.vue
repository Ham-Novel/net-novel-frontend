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
            <table class="striped">
                <thead>
                    <tr>
                        <th scope="col">작품명</th>
                        <th scope="col">정산 코인</th>
                        <th scope="col">정산 금액</th>
                        <th scope="col">시작 일자</th>
                        <th scope="col">처리 일자</th>
                        <th scope="col">처리 상태</th>
                    </tr>
                </thead>
                <tbody>
                    <InfiniteScroll v-bind="scrollProps">
                        <template #default="{ item }">
                            <tr>
                                <th scope="row">{{ item.novelTitle }}</th>
                                <td>{{ item.coinCount }}</td>
                                <td>{{ item.revenue }}</td>
                                <td>{{ item.createdAt }}</td>
                                <td>{{ item.completionDate }}</td>
                                <td class="result">{{ item.status }}</td>
                            </tr>
                        </template>
                    </InfiniteScroll>
                </tbody>
            </table>
        </section>
    </section>
</template>
<script setup>
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";
import { onMounted, ref, reactive } from "vue";
import { memberApi } from "@/hooks/backendApi";

onMounted(() => {
    loadWorksRevenue();
});

const worksProfitList = ref([]);

async function loadWorksRevenue() {
    const data = await memberApi.getWorksSettlement();
    worksProfitList.value.push(...data);
}

function requestSettlement() {
    memberApi.requestSettlement();
}

//스크롤 페이지 로드 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 10 },
    loadMethod: async (page, size) => {
        const loadData = await memberApi.getSettlementResult(page, size);
        console.log(loadData);
        return loadData;
    },
});

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
