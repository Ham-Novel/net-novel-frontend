import { onBeforeUnmount, onMounted } from "vue";

export const onClickOutside = (targetRef, handler) => {

    //클릭 이벤트 발생 시 리스너 로직
    const listener = (event) => {
        const modalElement = targetRef?.value?.$el || targetRef.value; // 컴포넌트의 루트 DOM 요소

        //클릭한 대상이 targetRef 요소의 내부이면 취소
        if (!modalElement || modalElement.contains(event.target)) {
            return;
        }

        handler(event);
    }

    // 컴포넌트가 마운트될 때 전역 클릭 이벤트 등록
    onMounted(async () => {
        window.addEventListener('click', listener);
    })
    // 컴포넌트가 언마운트될 때 전역 클릭 이벤트 제거
    onBeforeUnmount(() => {
        window.removeEventListener('click', listener)
    })
}