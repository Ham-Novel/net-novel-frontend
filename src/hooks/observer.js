import { onMounted, onUnmounted, reactive, ref } from "vue";

export function useObserver(options = {}) {

    const targets = ref([]); //observer에 등록한 DOM 요소
    const triggers = reactive([]); //observer로 감시되는 targets의 intersect 여부

    //IntersectionObserver 생성
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            triggers[index] = entry.isIntersecting;
            // console.log(index, entry.isIntersecting)
        });

    }, options);

    onMounted(() => {
        targets.value.forEach((target) => {
            triggers.push(false);
            observer.observe(target);
        });
        console.log(observer)
        console.log(triggers)
    })

    onUnmounted(() => {
        observer.disconnect();
    })

    //targets 값이 변경되었을 때 관련 처리 watcher

    return {
        targets,
        triggers
    }
};