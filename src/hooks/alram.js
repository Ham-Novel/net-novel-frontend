export const useAlram = () => {
    /**
     * 알람 이벤트 수신 시 작동시킬 이벤트 핸들러
     */
    const eventHandlers = {};

    // 이벤트 핸들러 등록 함수
    const addEvent = (eventType, handler) => {
        if (!eventHandlers[eventType]) {
            eventHandlers[eventType] = [];
        }
        eventHandlers[eventType].push(handler);
    }

    // 이벤트 핸들러 제거 함수
    const removeEvent = (eventType, handler) => {
        if (!eventHandlers[eventType]) return;

        const index = eventHandlers[eventType].indexOf(handler);
        if (index > -1) {
            eventHandlers[eventType].splice(index, 1);
        }
    }

    // 이벤트 발생 시 등록된 핸들러 실행
    const executeEvent = (eventType, event) => {
        const handlers = eventHandlers[eventType];
        if (handlers) {
            handlers.forEach((handler) => handler(event));
        }
    }

    /**
     * 클라이언트 pc 백엔드 서버와 연결
     */
    const connectSSE = () => {
        // 백엔드의 SSE 엔드포인트 URL
        const eventSource = new EventSource('http://localhost:8081/api/sse/subscribe', { withCredentials: true });

        // SSE 연결 성공 시 호출
        eventSource.onopen = () => {
            console.log("Connected To Alram API.");
        };

        // 서버에서 보내는 메시지를 수신하는 이벤트 핸들러
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("새로운 알림:", data);

            // 수신한 알림을 화면에 표시하는 로직 추가 (예: 알림 모달, toast 등)
            executeEvent('alram', event);
        };

        // 오류 발생 시 호출
        eventSource.onerror = (error) => {
            console.error("SSE 연결 오류:", error);
            // 자동 재연결 처리
            eventSource.close(); // 필요에 따라 SSE 연결 재시도 로직 추가 가능
        };
    }

    return {
        connectSSE,
        addEvent,
        removeEvent
    }
}
