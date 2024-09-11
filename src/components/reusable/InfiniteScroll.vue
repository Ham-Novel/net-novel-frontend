<template>
    <template v-for="(item, index) in itemList">
        <slot :item="item" :index="index"></slot>
    </template>
    <teleport defer to="main">
        <div
            class="loader-container"
            v-if="!itemLoader.state.allLoaded"
            :ref="(el) => scrollDetect.loader.setTarget(el)"
        ></div>
    </teleport>
</template>

<script setup>
import { ref, reactive, watch, toRaw, onMounted, useAttrs } from "vue";
import { useObserver } from "@/hooks/observer";

const props = defineProps(["loadMethod", "loadingMessage", "pageProps"]);

//아이템 저장 및 불러오기
const itemList = ref([]);

const itemLoader = reactive({
    pageable: { ...props.pageProps } ?? { number: 0, size: 10 },
    state: { isLoading: false, allLoaded: false },
    load() {
        this.progressLoading(async () => {
            if (this.state.allLoaded) return;
            const loadedItems = await this.putItems();
            this.pageable.number++;
            if (loadedItems.length === 0) this.state.allLoaded = true;
        });
    },
    async putItems() {
        const loadItems = await props.loadMethod(this.pageable.number, this.pageable.size);
        itemList.value.push(...loadItems);
        return loadItems;
    },
    async progressLoading(method) {
        if (this.state.isLoading) return;
        this.state.isLoading = true;

        await method();

        this.state.isLoading = false;
    },
    reset: () => {
        this.progressLoading(() => {
            itemLoader.pageable.number = 0;
            itemList.value.splice(0, itemLoader.value.length);
            itemLoader.state.allLoaded = false;
        });
    },
});

//부모 컴포넌트에 메서드 노출
defineExpose({ resetData: itemLoader.reset });

//첫번째 페이지 값 먼저 불러오기
onMounted(() => {
    itemLoader.load();
});

//페이지 최하단 도달시 이벤트 발생
const scrollDetect = reactive({
    loader: useObserver({ threshold: 0 }),
    handler(intersect) {
        if (intersect.state) {
            itemLoader.load();
        }
    },
});
//이벤트 핸들러 적용
watch(scrollDetect.loader.intersection, scrollDetect.handler);
</script>

<style lang="sass" scoped>
.loader-container
    height: 50px
</style>
