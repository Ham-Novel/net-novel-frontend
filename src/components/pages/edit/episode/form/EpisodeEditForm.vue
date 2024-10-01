<template>
    <form @submit.prevent="submit" class="create-form">
        <div class="novel-info">
            <section>
                <h4>에피소드 제목</h4>
                <input type="text" v-model="title" @keydown.enter.prevent :disabled="disabled" />
            </section>
            <section>
                <h4>구매가</h4>
                <select id="coin-cost-policy" v-model="policyId" :disabled="disabled">
                    <option v-for="policy in costPolicyList" :key="policy.id" :value="policy.id">
                        {{ policy.name }}
                    </option>
                </select>
            </section>
            <section>
                <h4>내용</h4>
                <TextArea v-model="content" :disabled="disabled"></TextArea>
            </section>
        </div>
        <div class="novel-nav">
            <input type="submit" value="에피소드 제출" />
        </div>
    </form>
</template>

<script setup>
import TextArea from "@/components/reusable/TextArea.vue";
import { computed, onMounted, ref, watch, watchEffect } from "vue";

const emits = defineEmits(["submit", "formInput"]);

const props = defineProps({
    initialInput: {
        type: Object,
        default: {
            title: "",
            content: "",
            policyId: 1,
        },
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

//form 입력 값
const title = ref(props.initialInput.title);
const policyId = ref(1);
const content = ref(props.initialInput.content);

//각 값이 변경될 때마다 외부 컴포넌트에 값 전달
watchEffect(() => {
    emits("formInput", {
        title: title.value,
        policyId: policyId.value,
        content: content.value,
    });
});

//가격 정책 불러오기 (나중에 가격 정책 가져오는 api 필요)
const costPolicyList = ref([
    { id: 1, name: "무료" },
    { id: 2, name: "유료" },
    { id: 3, name: "특전" },
]);

//form 제출 이벤트 신호를 emits로 전달
function submit() {
    emits("submit");
}
</script>

<style scoped lang="sass">

form
    position: relative

textarea
    width: 100%
    min-height: 300px

h4
    margin-bottom: 20px

.novel-nav
    position: fixed
    bottom: 0
    left: 0
    width: 100%
</style>
