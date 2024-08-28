<template>
    <div class="infinite-scroll-container">
        <template v-for="item in database.list">
            <slot :item="item"></slot>
        </template>
        <teleport to="main">
            <div
                class="infinite-scroll-loader"
                v-if="!database.state.allLoaded"
                :ref="(el) => scrollDetect.loader.setTarget(el)"
            >
                <span>{{ props.loadingMessage }}</span>
            </div>
        </teleport>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { useObserver } from "@/hooks/observer";

const props = defineProps(["loadMethod", "loadingMessage", "pageProps"]);

//아이템 저장 및 불러오기
const database = reactive({
    list: [],
    pageable: props.pageProps ?? { number: 0, size: 10 },
    state: { isLoading: false, allLoaded: false },
    async loadData() {
        //이미 메서드가 실행 중이거나 더이상 가져올 아이템이 없으면 중단
        if (this.state.isLoading || this.state.allLoaded) return;
        this.state.isLoading = true; //메서드 실행 상태로 전환

        props
            .loadMethod(this.pageable.number, this.pageable.size)
            .then((newData) => {
                // console.log(newData);

                //더이상 불러올 아이템이 없으면 로드 중단
                if (newData.length === 0) {
                    this.state.allLoaded = true; // 모든 아이템을 로드한 상태로 전환
                    return;
                }

                this.pageable.number++;
                this.list.push(...newData);
                this.state.isLoading = false; //메서드 미실행 상태로 전환

                // console.log(this.list);
            });
    },
    reset: () => {
        this.pageable.number = 0;
        this.list.splice(0, this.list.length);
        this.state.isLoading = false;
        this.state.allLoaded = false;
    },
});
defineExpose({ resetData: database.reset }); //부모 컴포넌트에 메서드 노출

//페이지 최하단 도달시 이벤트 발생
const scrollDetect = reactive({
    loader: useObserver({ threshold: 0 }),
    handler(intersect) {
        if (intersect.state) {
            database.loadData();
        }
    },
});
//이벤트 핸들러 적용
watch(scrollDetect.loader.intersection, scrollDetect.handler);
</script>

<style lang="sass" scoped>
.infinite-scroll-loader
    height: 100px
    display: flex
    justify-content: center
    align-items: center

    span
        display: inline
</style>
