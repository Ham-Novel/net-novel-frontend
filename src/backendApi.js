const API_URL = 'http://localhost:8081/api';
const BAD_REQUEST_MSG = 'Network response was not ok'


async function apiConnect(reqUrl, reqMeta) {
    const resp = await fetch(reqUrl, reqMeta);
    if (!resp.ok) {
        throw new Error(BAD_REQUEST_MSG);
    }
    return resp.json();
}

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

    async getBrowseNovels(page, size) {
        try {
            const reqUrl = `${API_URL}/novels?pageNumber=${page}&pageSize=${size}`
            const resp = await fetch(reqUrl);
            if (!resp.ok) {
                throw new Error(BAD_REQUEST_MSG);
            }
            return resp.json();
        } catch (error) {
            console.error("Error fetching getBrowseNovels()", error);
        }
    },

    async getRanking(page, size, period) {
        const reqUrl = `${API_URL}/novels/ranking?pageNumber=${page}&pageSize=${size}&period=${period}`
        const reqMeta = {
            method: 'GET',
        }
        try {
            return apiConnect(reqUrl, reqMeta);
        } catch (error) {
            console.error(`Error fetching toggleNovelFavorite()`, error);
        }
    }
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
    async getRecentReadNovels(page, size) {
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


    async getCheckFavorite(id) {
        try {
            const reqUrl = `${API_URL}/members/me/favorites/check?novelId=${id}`
            const resp = await fetch(reqUrl);
            if (!resp.ok) {
                throw new Error(BAD_REQUEST_MSG);
            }
            return resp.json();
        } catch (error) {
            console.error("Error fetching getFavoriteNovels() ", error);
        }
    },
    async toggleNovelFavorite(id) {
        const reqUrl = `${API_URL}/members/me/favorites/${id}`
        const reqMeta = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            return apiConnect(reqUrl, reqMeta);
        } catch (error) {
            console.error(`Error fetching toggleNovelFavorite()`, error);
        }
    },
    async getFavoriteNovels() {
        try {
            const reqUrl = `${API_URL}/members/me/favorites`
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