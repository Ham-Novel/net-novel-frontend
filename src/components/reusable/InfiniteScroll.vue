<template>
    <div class="infinite-scroll-container">
        <slot></slot>
        <div v-if="loading" class="infinite-scroll-loading"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps(["loadMethod", "loadingMessage"]);
const emits = defineEmits(["addItems"]);

//변수 설정
const loading = ref(false); //loadItems 실행중
const allLoaded = ref(false); //더이상 불러올 itemList 없음

//아이템을 불러와서 목록에 추가하는 메서드
const addScrollList = async () => {
    //이미 메서드가 실행 중이거나 더이상 가져올 아이템이 없으면 중단
    if (loading.value || allLoaded.value) return;
    loading.value = true; //메서드 실행 상태로 전환

    props.loadMethod().then((loadItems) => {
        console.log(loadItems);

        //더이상 불러올 아이템이 없으면 로드 중단
        if (loadItems.length === 0) {
            allLoaded.value = true; // 모든 아이템을 로드한 상태로 전환
        }

        emits("addItems", loadItems);
        loading.value = false; //메서드 미실행 상태로 전환
    });
};

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
