import { onMounted, onUnmounted, reactive, } from "vue";

//한 곳에 모든 책임과 코드가 모여 있음. 코드 분리 필요.
export function useObserver(options = {}) {

    const targets = new Map(); //observer에 등록한 DOM 요소
    const intersection = reactive({ state: false, data: {} }); //observer로 감시되는 targets의 intersect 여부

    //targets에 컴포넌트를 추가하는 메서드
    const setTarget = (el, index = 0) => {
        if (el) {
            let target = ('$el' in el) ? el.$el : el; //컴포넌트 인스턴스일 경우, HTML DOM 요소로 변환
            targets.set(index, target);
            observer.observe(target);
        }
    }

    //IntersectionObserver 생성
    const observer = new IntersectionObserver(entries => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            intersection.state = true;
            intersection.data = { ...entry.target.dataset };
        } else {
            intersection.state = false;
            intersection.data = {};
        }
    }, options);

    //컴포넌트들이 렌더링되면 targets를 observer로 감시
    onMounted(() => {
        targets.forEach((target) => {
            observer.observe(target);
        });
    })

    //페이지가 넘어가면 observer 해제
    onUnmounted(() => {
        observer.disconnect();
    })

    return {
        targets,
        intersection,
        setTarget
    }
};