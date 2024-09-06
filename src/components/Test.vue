<template>
    <div class="container">
        <button @click="addItem" class="add-button">위로 아이템 추가</button>
        <div ref="containerRef" class="scroll-container">
            <div v-for="(item, index) in items" :key="index" class="item">
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted, nextTick } from "vue";

export default {
    setup() {
        const items = ref([]);
        const containerRef = ref(null);

        const addItem = () => {
            items.value.unshift(`Item ${items.value.length + 1}`);
            nextTick(() => {
                adjustScroll();
            });
        };

        const adjustScroll = () => {
            if (containerRef.value) {
                const { scrollHeight, clientHeight } = containerRef.value;
                const maxScrollTop = scrollHeight - clientHeight;
                containerRef.value.scrollTop = maxScrollTop;
            }
        };

        const handleResize = () => {
            adjustScroll();
        };

        onMounted(() => {
            window.addEventListener("resize", handleResize);
        });

        onUnmounted(() => {
            window.removeEventListener("resize", handleResize);
        });

        return {
            items,
            containerRef,
            addItem,
        };
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 1rem;
}

.add-button {
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    background-color: #3490dc;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.add-button:hover {
    background-color: #2779bd;
}

.scroll-container {
    flex-grow: 1;
    overflow-y: auto;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
}

.item {
    padding: 0.5rem;
    border-bottom: 1px solid #e2e8f0;
}

.item:last-child {
    border-bottom: none;
}
</style>
