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
        const resp = await fetch(`${API_URL}/novels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createDto),
        });
    },
}

export const tagApi = {
    async getTagsByNovel(id) {
        try {
            const reqUrl = `${API_URL}/novels/${id}/tags`
            const resp = await fetch(reqUrl);
            if (!resp.ok) {
                throw new Error(BAD_REQUEST_MSG);
            }
            return resp.json();
        } catch (error) {
            console.error("Error fetching getTagsByNovel()", error);
        }
    }
}


export const episodeApi = {
    async getEpisodesByNovel(id, sort, page, size) {
        try {
            const reqUrl = `${API_URL}/novels/${id}/episodes?&sortBy=${sort}&pageNumber=${page}&pageSize=${size}`
            const resp = await fetch(reqUrl);
            if (!resp.ok) {
                throw new Error(BAD_REQUEST_MSG);
            }
            return resp.json();
        } catch (error) {
            console.error("Error fetching getEpisodesByNovel()", error);
        }
    },
    async getEpisodesInfoByNovel(id) {
        try {
            const reqUrl = `${API_URL}/novels/${id}/episodes/info`;
            const resp = await fetch(reqUrl);
            if (!resp.ok) {
                throw new Error(BAD_REQUEST_MSG);
            }
            return resp.json();
        } catch (error) {
            console.error("Error fetching getEpisodesCountByNovel()", error);
        }
    }
}

export const commentApi = {
    async getCommentsByNovel(id, sort, page, size) {
        try {
            const reqUrl = `${API_URL}/novels/${id}/comments?sortBy=${sort}&pageNumber=${page}&pageSize=${size}`
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
        try {
            const reqUrl = `${API_URL}/members/me/mypage`
            const resp = await fetch(reqUrl);
            if (!resp.ok) {
                throw new Error(BAD_REQUEST_MSG);
            }
            return resp.json();
        } catch (error) {
            console.error("Error fetching getMyPageData:", error);
        }
    },
    async getRecentReadNovels() {
        const page = 0;
        const size = 10;
        try {
            const reqUrl = `${API_URL}/members/me/recent-read?pageNumber=${page}&pageSize=${size}`
            const resp = await fetch(reqUrl);
            if (!resp.ok) {
                throw new Error(BAD_REQUEST_MSG);
            }
            return resp.json();
        } catch (error) {
            console.error("Error fetching getRecentReadNovels() ", error);
        }
    },
    async getFavoriteNovels() {
        try {
            const reqUrl = `${API_URL}/members/me/novels`
            const resp = await fetch(reqUrl);
            if (!resp.ok) {
                throw new Error(BAD_REQUEST_MSG);
            }
            return resp.json();
        } catch (error) {
            console.error("Error fetching getFavoriteNovels() ", error);
        }
    },
}