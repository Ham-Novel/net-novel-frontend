<template>
    <form @submit.prevent="submit" class="create-form">
        <input type="submit" value="에피소드 제출" />
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
                <textarea
                    name="content"
                    v-model="content"
                    :disabled="disabled"
                    ref="contentRef"
                ></textarea>
            </section>
        </div>
    </form>
</template>

<script setup>
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

//textarea 높이 에피소드 내용에 맞게 조절
const contentRef = ref(null);
function resizeTextarea() {
    const textarea = contentRef.value;
    textarea.style.height = "auto"; // 높이를 초기화
    textarea.style.height = textarea.scrollHeight + "px"; // scrollHeight에 맞게 높이 조정
}

//content 값이 변경될 때마다 이벤트 발생
watch(content, (value) => {
    resizeTextarea();
});

//content 초기값 설정 시 텍스트 크기 조정
onMounted(() => {
    resizeTextarea();
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
    height: fit-content
    resize: none
    overflow-y: hidden

h4
    margin-bottom: 20px
</style>
