<template>
    <tr class="item">
        <td class="col-date">{{ props.createdAt }}</td>
        <td class="col-coin">{{ props.coinAmount }}</td>
        <td class="col-payment">{{ props.payment }}</td>
    </tr>
</template>

<script setup>
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
</script>

<style scoped lang="sass">
// .item
//     padding: 15px
//     border-bottom: 1px solid #eee
//     cursor: pointer

//     display: flex
//     align-items: center
//     gap: 30px


//     &:hover
//         background-color: #f5f5f5
</style>
