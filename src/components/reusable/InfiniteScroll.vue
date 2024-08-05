<template>
    <div class="infinite-scroll-container">
        <slot></slot>
        <div v-if="loading" class="infinite-scroll-loading"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import novelAPI from "@/serverApi";

const props = defineProps(["loadMethod", "loadingMessage"]);
const emits = defineEmits(["addItems"]);

//변수 설정
// const itemList = ref([]);
// const page = ref(0);
const loading = ref(false); //loadItems 실행중
const allLoaded = ref(false); //더이상 불러올 itemList 없음

//아이템을 불러와서 목록에 추가하는 메서드
const addScrollList = async () => {
    if (loading.value || allLoaded.value) return;
    console.log("check");
    loading.value = true;

    // 새 아이템을 생성하는 함수
    const loadItems = await props.loadMethod();
    console.log(loadItems);

    //더이상 불러올 아이템이 없으면 로드 중단
    if (loadItems.length === 0) {
        allLoaded.value = true;
    }
    emits("addItems", loadItems);
    // page.value++;
    loading.value = false;
};

// //아이템 리스트 초기화 및 다시 불러오기
// const resetList = () => {
//     loading.value = true;
//     itemList.value = [];
//     page.value = 0;
//     loading.value = false;
//     addScrollList();
// };

// //resetList 함수 외부 컴포넌트에서 사용
// defineExpose({
//     resetList,
// });

//페이지 최하단 도달하는 스크롤 이벤트 감지
const handleScroll = () => {
    console.log("handleScroll");
    const bottomOfWindow =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;

    if (bottomOfWindow) {
        addScrollList(); //이벤트 발동 시 실행하는 메서드
    }
};

onMounted(() => {
    addScrollList();
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="sass" scoped>
.infinite-scroll-loading
    display: flex
    justify-content: center
    align-itemList: center
    height: 100px
</style>
