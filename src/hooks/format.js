
//상세 수치 포메팅
const formatStat = (value) => {
    if (value >= 1_000_000) {
        return (value / 1_000_000).toFixed(1) + 'm'; // 백만 단위
    } else if (value >= 1_000) {
        return (value / 1_000).toFixed(1) + 'k'; // 천 단위
    } else {
        return value.toString(); // 천 미만의 숫자 그대로 표시
    }
}


//날짜 포메팅 변환
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
};


const formatRealTime = (dateString) => {
    const update_date = new Date(dateString);
    const current_date = new Date();

    if (isInOneDay(current_date, update_date)) {
        const day_gap = current_date.getDate() - update_date.getDate();
        const time_gap = (current_date.getHours() + day_gap * 24) - update_date.getHours()
        return `${time_gap}시간 전`
    }
    else {
        const year = update_date.getFullYear().toString().slice(-2);
        const month = (update_date.getMonth() + 1).toString().padStart(2, "0");
        const day = update_date.getDate().toString().padStart(2, "0");
        return `${year}.${month}.${day}`;
    }
};

function isInOneDay(std_date, sbj_date) {
    const dayMiliSeconds = 24 * 60 * 60 * 1000; //하루분 시간 밀리세컨드 변환
    return Math.abs(std_date.getTime() - sbj_date.getTime()) < dayMiliSeconds;
}

export const formatUtil = {
    formatDate,
    formatRealTime,
    formatStat
}