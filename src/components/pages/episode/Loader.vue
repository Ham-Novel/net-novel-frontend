<template>
    <div class="loader" :ref="(el) => observer.setTarget(el)"></div>
</template>

<script setup>
import { watch } from "vue";
import { useObserver } from "@/hooks/observer";

const emits = defineEmits(["load-method"]);

const observer = useObserver({ threshold: 0 });

const detectHandler = (intersect) => {
    if (intersect.state) {
        emits("load-method");
    }
};

watch(observer.intersection, detectHandler);
</script>

<style scoped lang="sass">
.loader
    width: 100%
    height: 100%
</style>
