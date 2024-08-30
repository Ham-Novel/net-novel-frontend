import { ErrorCodes } from "vue";

const API_URL = 'http://localhost:8081/api';
const BAD_REQUEST_MSG = 'Network response was not ok'



class PaymentRequiredError extends Error {
    constructor(message, paymentPolicy) {
        super(message);
        this.name = 'PaymentRequiredError';
        this.paymentPolicy = paymentPolicy;
    }
}

async function requestServer(reqUrl, reqHeader) {
    reqHeader.credentials = 'include'
    const resp = await fetch(reqUrl, reqHeader);
    if (resp.status === 401) {
        throw new Error(`Authentication Error`);
    }
    else if (resp.status === 400) {
        throw new Error(`HTTP error! status: ${resp.status}`);
    }
    return resp;
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
            const resp = await requestServer(reqUrl, reqMeta)
            return resp.json();
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
    async getEpisode(id) {
        try {
            const resp = await fetch(`${API_URL}/episodes/${id}`, { method: 'GET', credentials: 'include' });
            const data = await resp.json();
            if (resp.status === 402) {
                data.payCheck = false;
                throw new PaymentRequiredError("에피소드 미결제 접근", data);
            }
            else if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}`);
            }
            else {
                data.payCheck = true;
                return data;
            }
        } catch (error) {
            if (error instanceof PaymentRequiredError) {
                console.info(error.message);
                return error.paymentPolicy;
            }
            console.error("Error fetching getEpisode()", error);
        }
    },
    async getEpisodeBeside(id, direction) {
        try {
            const url = `${API_URL}/episodes/${id}/beside?direction=${direction}`;
            const header = {
                method: 'GET',
            };
            const resp = await requestServer(url, header);
            return resp;
        } catch (error) {
            console.error("backendApi.js getEpisodeBeside() : ", error);
        }
    },

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
    },


    async payForEpisode(paymentDto) {
        const reqUrl = `${API_URL}/coin-use-histories`
        const reqMeta = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentDto)
        }
        try {
            return (await requestServer(reqUrl, reqMeta)).text();
        } catch (error) {
            console.error(`Error fetching toggleNovelFavorite()`, error);
        }
    },
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
    //마이페이지 관련 api
    async getMyPageData() {
        try {
            const reqUrl = `${API_URL}/members/me/mypage`
            const reqMeta = {
                method: 'GET',
                credentials: 'include' //쿠키에 인증 session 추가
            }
            return (await requestServer(reqUrl, reqMeta)).json();
        } catch (error) {
            console.error("Error fetching getMyPageData:", error);
        }
    },

    //읽은 기록 관련 api
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

    //선호작 관련 api
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
            return requestServer(reqUrl, reqMeta).json();
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