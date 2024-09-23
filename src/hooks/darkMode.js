import { computed, onMounted, ref, watch } from "vue";
import { useDarkModeStore } from "@/stores/darkModeStore";

export const useDarkMode = () => {
    //다크 모드 상태 관리
    const darkModeStore = useDarkModeStore();

    //다크 모드 상태 변경 시 자동으로 테마 적용
    watch(
        () => darkModeStore.isDarkMode,
        (newMode) => setDarkMode(newMode)
    );

    //테마 적용 메서드
    const htmlElement = document.documentElement;
    function setDarkMode(mode) {
        htmlElement.setAttribute("data-theme", (mode) ? 'dark' : 'light');
    }

    // 페이지 로드 시 저장된 테마 적용
    onMounted(() => {
        setDarkMode(darkModeStore.isDarkMode);
    })
}