<template>
    <div class="infinite-scroll-container">
        <template v-for="item in itemList">
            <slot :item="item"></slot>
        </template>
        <div v-if="loading" class="infinite-scroll-loading"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from "vue";

const props = defineProps(["loadMethod", "loadingMessage", "pageProps"]);

//변수 설정
let pageNumber = props.pageProps.number ?? 0;
let pageSize = props.pageProps.size ?? 10;
const itemList = reactive([]); //데이터 저장 공간

const loading = ref(false); //loadItems 실행 중을 나타내는 상태 변수
const allLoaded = ref(false); //더이상 불러올 itemList 없음을 나타내는 상태 변수

//아이템을 불러와서 목록에 추가하는 메서드
const addScrollList = async () => {
    //이미 메서드가 실행 중이거나 더이상 가져올 아이템이 없으면 중단
    if (loading.value || allLoaded.value) return;
    loading.value = true; //메서드 실행 상태로 전환

    props.loadMethod(pageNumber, pageSize).then((loadItems) => {
        console.log(loadItems);

        //더이상 불러올 아이템이 없으면 로드 중단
        if (loadItems.length === 0) {
            allLoaded.value = true; // 모든 아이템을 로드한 상태로 전환
            return;
        }

        pageNumber++;
        addItem(loadItems);

        loading.value = false; //메서드 미실행 상태로 전환
    });
};

//데이터 저장 메서드
const addItem = (newItems) => {
    itemList.push(...newItems);
};

//데이터 리셋
const resetItem = () => {
    pageNumber = 0;
    itemList.splice(0, itemList.length);
    setTimeout(() => {
        window.dispatchEvent(new Event("scroll"));
    }, 1);
};
defineExpose({ resetItem }); //부모 컴포넌트에 메서드 노출

//페이지 최하단 도달 시 이벤트 발생
const handleScroll = () => {
    console.log("handleScroll");
    const bottomOfWindow =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;
    if (bottomOfWindow) {
        addScrollList(); //이벤트 발동 시 실행하는 메서드
    }
};

//스크롤 이벤트 감지
onMounted(() => {
    addScrollList();
    window.addEventListener("scroll", handleScroll);
});

//페이지에서 벗어났을 때 이벤트 감지기 제거
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
