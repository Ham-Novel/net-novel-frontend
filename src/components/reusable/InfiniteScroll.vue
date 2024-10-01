<template>
    <template v-for="(item, index) in itemList" :key="index">
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
import { ref, reactive, watch, onMounted } from "vue";
import { useObserver } from "@/hooks/observer";

const props = defineProps({
    loadMethod: {
        type: Function,
        required: true,
    },
    pageProps: {
        type: Object,
        default: { number: 0, size: 10 },
    },
    mountLoad: {
        type: Boolean,
        default: true,
    },
});

//아이템 저장 및 불러오기
const itemList = ref([]);

const itemLoader = reactive({
    pageable: { ...props.pageProps },
    state: { isLoading: false, allLoaded: true },
    async putItems() {
        try {
            const loadItems = await props.loadMethod(this.pageable.number, this.pageable.size);
            itemList.value.push(...loadItems);
            this.pageable.number++;
            return loadItems;
        } catch (error) {
            console.error("Cannot put items in scroll list: ", error.message);
            itemLoader.state.allLoaded = true;
        }
    },
    async progressLoading(method) {
        if (this.state.isLoading) {
            console.debug("[SCROLL] loading");
            return;
        }
        this.state.isLoading = true;

        await method();

        this.state.isLoading = false;
    },
    mountLoad: (msg) => {
        itemLoader.progressLoading(async () => {
            console.debug("[SCROLL] " + msg);
            if (itemLoader.state.allLoaded) return;
            const loadedItems = await itemLoader.putItems();
            if (loadedItems?.length < itemLoader.pageable.size) itemLoader.state.allLoaded = true;
        });
    },
    reset: async () => {
        await itemLoader.progressLoading(() => {
            itemLoader.pageable.number = 0;
            itemList.value.splice(0);
            itemLoader.state.allLoaded = false;
            console.debug("[SCROLL] reset", itemList.value);
        });
        itemLoader.mountLoad("reload");
    },
});

//첫번째 페이지 값 먼저 불러오기
onMounted(() => {
    console.log(props.mountLoad);
    if (props.mountLoad) {
        itemLoader.state.allLoaded = false;
        itemLoader.mountLoad("first");
    } else {
        itemLoader.state.allLoaded = true;
    }
});

//페이지 최하단 도달시 이벤트 발생
const scrollDetect = reactive({
    loader: useObserver({ threshold: 0 }),
    handler(intersect) {
        if (intersect.state) {
            itemLoader.mountLoad("put");
        }
    },
});
//이벤트 핸들러 적용
watch(scrollDetect.loader.intersection, scrollDetect.handler);

//부모 컴포넌트에 메서드 노출
defineExpose({ reset: itemLoader.reset, itemList });
</script>

<style lang="sass" scoped>
.loader-container
    height: 10px
    // background-color: blue
</style>
