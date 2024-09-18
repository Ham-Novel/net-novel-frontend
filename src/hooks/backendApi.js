import { AuthenticationError, BadRequestError, ServerError } from "./error";

const API_URL = 'http://localhost:8081/api';
const BAD_REQUEST_MSG = 'Network response was not ok'

async function requestApi(reqUrl, reqHeader = { method: 'GET' }) {
    console.debug(reqUrl)
    reqHeader.credentials = 'include'
    console.debug(reqHeader)
    const resp = await fetch(reqUrl, reqHeader);
    if (resp.status === 400) {
        throw new BadRequestError(`Bad Request!`);
    }
    else if (resp.status === 401) {
        const error = new AuthenticationError(`Authentication Not Allowed`);
        error.handle();
        throw error;
    }
    else if (resp.status === 500) {
        throw new ServerError('Server Api Error');
    }
    return resp;
}

export const coinApi = {
    async getChargeHistory(page, size) {
        try {
            const url = `${API_URL}/members/me/coin-charge-history?pageNumber=${page}&pageSize=${size}`;
            const resp = await requestApi(url);
            return await resp.json();
        } catch (error) {
            console.error("Error fetching getChargeHistory", error);
        }
    },
    async chargeCoins(createDto) {
        try {
            const url = `${API_URL}/coin-charge-history`;
            const header = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createDto),
            };
            const resp = await requestApi(url, header);
            return resp;
        } catch (error) {
            console.error("Error fetching chargeCoins()", error);
        }
    },

}

export const novelApi = {
    async getNovel(id) {
        const url = `${API_URL}/novels/${id}`
        const resp = await requestApi(url);
        return resp.json();
    },

    async createNovel(createDto) {
        try {
            const url = `${API_URL}/novels`
            const header = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createDto),
            };
            const resp = await requestApi(url, header);
            return resp;
        } catch (error) {
            console.error("backendApi.js createNovel() : ", error);
        }
    },

    async setNovelThumbnail(id, imgFile) {
        try {
            //MultipartFile 변환
            const formData = new FormData();
            formData.append('file', imgFile);
            console.log("form data: ", ...formData)

            const url = `${API_URL}/novels/${id}/thumbnail`
            const header = {
                method: 'POST',
                body: formData,
            };

            const resp = await requestApi(url, header);
            return resp;
        } catch (error) {
            console.error("backendApi.js setNovelThumbnail() : ", error);
        }
    },

    async getListNovels(page, size) {
        try {
            const reqUrl = `${API_URL}/novels?pageNumber=${page}&pageSize=${size}`
            const resp = await fetch(reqUrl);
            if (!resp.ok) {
                throw new Error(BAD_REQUEST_MSG);
            }
            return await resp.json();
        } catch (error) {
            console.error("Error fetching getBrowseNovels()", error);
        }
    },

    // async getBrowseNovels(view, page, size, tags) {
    //     let url = `${API_URL}/novels/search?sortBy=${view}&pageNumber=${page}&pageSize=${size}`
    //     if ((tags ?? false) && tags.length !== 0) {
    //         url += `&tagId=${tags.join(",")}`
    //     }
    //     try {
    //         const resp = await requestApi(url);
    //         return resp.json();
    //     } catch (error) {
    //         console.error("Error fetching getBrowseNovels()", error);
    //     }
    // },
    async getBrowseNovels(view, page, size, tags) {
        let url = `${API_URL}/novels/search?sortBy=${view}&pageNumber=${page}&pageSize=${size}`
        if ((tags ?? false) && tags.length !== 0) {
            url += `&tagId=${tags.join(",")}`
        }
        try {
            const resp = await requestApi(url);
            return resp.json();
        } catch (error) {
            console.error("Error fetching getBrowseNovels()", error);
        }
    },

    async getRanking(page, size, period) {
        const url = `${API_URL}/novels/ranking?pageNumber=${page}&pageSize=${size}&period=${period}`
        try {
            const resp = await requestApi(url)
            return resp.json();
        } catch (error) {
            console.error(`Error fetching toggleNovelFavorite()`, error);
        }
    }
}

export const tagApi = {
    async getTagsByNovel(id) {
        try {
            const url = `${API_URL}/novels/${id}/tags`
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(BAD_REQUEST_MSG);
            }
            return await resp.json();
        } catch (error) {
            console.error("Error fetching getTagsByNovel()", error);
        }
    },
    async getTagByName(name) {
        try {
            const url = `${API_URL}/tags?tagName=${name}`
            const resp = await requestApi(url)
            return resp.json();
        } catch (error) {

        }
    }
}

export const episodeApi = {
    async getEpisode(id) {
        try {
            const url = `${API_URL}/episodes/${id}`;
            const resp = await requestApi(url);
            return resp;
        } catch (error) {
            if (error instanceof AuthenticationError) {
                error.handle();
            }
            console.error("Error fetching getEpisode()", error);
        }
    },

    async getEpisodeBeside(id, direction) {
        try {
            const url = `${API_URL}/episodes/${id}/beside?direction=${direction}`;
            const resp = await requestApi(url);
            return resp;
        } catch (error) {
            if (error instanceof AuthenticationError) {
                error.handle();
            }
            console.error("backendApi.js getEpisodeBeside() : ", error);
        }
    },

    async createEpisode(novelId, createDto) {
        try {
            const url = `${API_URL}/novels/${novelId}/episodes`
            const header = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createDto),
            };
            const resp = await requestApi(url, header);
            return resp;
        } catch (error) {
            console.error("backendApi.js createEpisode() : ", error);
        }
    },

    async getEpisodesByNovel(id, sort, page, size) {
        try {
            const reqUrl = `${API_URL}/novels/${id}/episodes?&sortBy=${sort}&pageNumber=${page}&pageSize=${size}`
            const resp = await fetch(reqUrl);
            if (!resp.ok) {
                throw new Error(BAD_REQUEST_MSG);
            }
            return await resp.json();
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
            return await resp.json();
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
            return (await requestApi(reqUrl, reqMeta)).text();
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
            return await resp.json();

        } catch (error) {
            console.error("Error fetching getCommentsByNovel()", error);
        }
    },
}

export const memberApi = {
    AuthenticationError,
    //마이페이지 관련 api
    async getMyPageData() {
        try {
            const url = `${API_URL}/members/me/mypage`
            const header = {
                method: 'GET',
            }
            const resp = await requestApi(url, header);
            return await resp.json();
        } catch (error) {
            console.error("Error fetching getMyPageData:", error);
        }
    },

    async getWorks() {
        try {
            const url = `${API_URL}/members/me/novels`
            const header = {
                method: 'GET',
            }
            const resp = await requestApi(url, header);
            return resp;
        } catch (error) {
            console.error("backendApi getWorks() :", error);
        }
    },

    //읽은 기록 관련 api
    async getRecentReadNovels(page, size) {
        const url = `${API_URL}/members/me/recent-read?pageNumber=${page}&pageSize=${size}`
        try {
            const resp = await requestApi(url);
            return await resp.json();
        } catch (error) {
            console.error("Error fetching getRecentReadNovels() ", error);
        }
    },

    //선호작 관련 api
    async getCheckFavorite(id) {
        const url = `${API_URL}/members/me/favorites/check?novelId=${id}`
        const resp = await requestApi(url);
        return resp;
    },
    async toggleNovelFavorite(id) {
        const url = `${API_URL}/members/me/favorites/${id}`
        const header = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const resp = await requestApi(url, header);
        return resp.json();
    },
    async getFavoriteNovels() {
        const url = `${API_URL}/members/me/favorites`;
        const resp = await requestApi(url);
        return await resp.json();
    },
}