<template>
    <tr class="item">
        <td class="col-date">{{ chargeDate }}</td>
        <td class="col-coin">{{ props.coinAmount }}</td>
        <td class="col-payment">{{ props.payment }}</td>
    </tr>
</template>

<script setup>
import { formatUtil } from "@/hooks/format";
import { computed } from "vue";

const props = defineProps({
    createdAt: {
        type: String,
        required: true,
    },
    coinAmount: {
        type: Number,
        required: true,
    },
    payment: {
        type: Number,
        required: true,
    },
});

const chargeDate = computed(() => {
    return formatUtil.formatDate(props.createdAt);
});
</script>

<style scoped lang="sass">
.item
    height: 40px
    border-bottom: 1px solid #eee
    cursor: pointer

    &:hover
        background-color: #f5f5f5

    td
        border-right: 2px solid black

    .col-date
        padding-left: 15px

    .col-coin, .col-payment
        padding-right: 15px
</style>
