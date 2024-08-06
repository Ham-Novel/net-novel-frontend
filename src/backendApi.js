const API_URL = 'http://localhost:8081/api';
const BAD_REQUEST_MSG = 'Network response was not ok'

export const novelApi = {
    async getNovel(id) {
        try {
            const reqUrl = `${API_URL}/novels/${id}`
            const resp = await fetch(reqUrl);
            if (!resp.ok) {
                throw new Error(BAD_REQUEST_MSG);
            }
            return resp.json();
        } catch (error) {
            console.error("Error fetching getNovel()", error);
        }
    },

    async createNovel(createDto) {
        const response = await fetch(`${API_URL}/novels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createDto),
        });
    },
}


export const episodeApi = {
    async getEpisodesByNovel(id, sort, page, size) {
        try {
            const reqUrl = `${API_URL}/episodes?novelId=${id}&sortBy=${sort}&pageNumber=${page}&pageSize=${size}`
            const resp = await fetch(reqUrl);
            if (!resp.ok) {
                throw new Error(BAD_REQUEST_MSG);
            }
            return resp.json();
        } catch (error) {
            console.error("Error fetching getEpisodesByNovel()", error);
        }
    }
}

export const commentApi = {
    async getCommentsByNovel(id, sort, page, size) {
        try {
            const reqUrl = `${API_URL}/comments/novel/${id}?sortBy=${sort}&pageNumber=${page}&pageSize=${size}`
            const resp = await fetch(reqUrl);
            if (!resp.ok) {
                throw new Error(BAD_REQUEST_MSG);
            }
            return resp.json();

        } catch (error) {
            console.error("Error fetching getCommentsByNovel()", error);
        }
    },
}

export const memberApi = {
    async getMyPageData() {
        const reqUrl = `${API_URL}/member/mypage`
        const response = await fetch(reqUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(BAD_REQUEST_MSG);
        }
        return response.json();
    },

}



// async getEpisodesByNovel(novelId) {
//     const reqUrl = `${API_URL}/api/episode?novelId=${novelId}`
//     const response = await fetch(reqUrl);
//     if (!response.ok) {
//         throw new Error('getEpisodesByNovel: Network response was not ok');
//     }
//     return response.json();
// },


// async getCommentsByNovel(novelId, sortBy, pageNumber, pageSize) {
//     const reqUrl = `${API_URL}/api/comments/novel/${novelId}?sortBy=${sortBy}&pageNumber=${pageNumber}&pageSize=${pageSize}`
//     console.log(reqUrl)
//     const response = await fetch(reqUrl);
//     if (!response.ok) {
//         throw new Error('getCommentsByNovel: Network response was not ok');
//     }
//     return response.json();
// },

export default {
};