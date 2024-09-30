import router from "@/router";
import axios from "axios";

const BACKEND_URL = 'http://localhost:8081/api';

async function fetchApi({ method, url, params, data } = {}) {
    const config = {
        method,
        url,
        baseURL: BACKEND_URL,
        withCredentials: true,
        data,
        params
    }
    console.debug('[BACKEND_API]', config)

    return await axios(config);
}

function handleError(error, mode = 'ALERT') {
    switch (error.response.status) {
        case 400:
            console.error('Bad Request: ', error.response.data);
            break;
        case 401:
            console.error('Authorized: ', error.response.data);
            handleAuth(mode);
            break;
        case 500:
            console.error('Server Error: ', error.response.data);
            break;
        default:
            console.error('Other Error: ', error.response.data);
    }
}

function handleAuth(mode) {
    switch (mode) {
        case 'INACTION':
            break
        case 'ALERT':
            alert("로그인이 필요한 서비스입니다.");
            break;
        case 'LOGIN':
            const result = confirm("로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까");
            if (result) {
                router.push({ name: 'login' })
            } else {
                router.push({ name: 'home' })
            }
            break;
    }
}

export const coinApi = {
    async getChargeHistory(page, size) {
        try {
            const response = await fetchApi({
                method: 'get',
                url: '/members/me/coin-charge-history',
                params: {
                    pageNumber: page,
                    pageSize: size
                }
            });
            return response.data;
        } catch (error) {
            console.error("Failed to load coin charge history");
            handleError(error, "LOGIN")
            throw error;
        }
    },

    async chargeCoins(createDto) {
        try {
            const response = await fetchApi({
                method: 'post',
                url: '/coin-charge-history',
                data: createDto
            });
            return response.data;
        } catch (error) {
            console.error("Failed to execute charge coins");
            handleError(error, "LOGIN")
            throw error;
        }
    },

}

export const novelApi = {
    async getNovel(id) {
        try {
            const response = await fetchApi({ method: 'get', url: `/novels/${id}` });
            return response.data;
        } catch (error) {
            console.error("Failed to load novel info");
            handleError(error, 'INACTION');
            return error;
        }
    },

    async createNovel(createDto) {
        try {
            const response = await fetchApi({ method: 'post', url: '/novels', data: createDto })
            return response.data;
        } catch (error) {
            console.error("Failed to create novel");
            handleError(error, 'INACTION');
            return error;
        }
    },

    async updateNovel(id, updateDto) {
        try {
            const response = await fetchApi({ method: 'put', url: `/novels/${id}`, data: updateDto })
            return response.data;
        } catch (error) {
            console.error("Failed to update novel");
            handleError(error, 'INACTION');
            return error;
        }
    },

    async deleteNovel(id, deleteDto) {
        try {
            const response = await fetchApi({ method: 'delete', url: `/novels/${id}`, data: deleteDto })
        } catch (error) {
            console.error("Failed to update novel");
            handleError(error, 'INACTION');
            return error;
        }
    },

    async setNovelThumbnail(id, imgFile) {
        try {
            const formData = new FormData();
            formData.append('file', imgFile);
            await fetchApi({ method: 'post', url: `/novels/${id}/thumbnail`, data: formData });

        } catch (error) {
            console.error("Failed to upload thumbnail of novel")
            handleError(error, 'INACTION');
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

    async getSearchNovels(word, type, page, size) {
        try {
            const response = await fetchApi({
                method: 'get',
                url: "/novels/search",
                params: {
                    searchWord: word,
                    searchType: type,
                    pageNumber: page,
                    pageSize: size,
                }
            })
            return response.data;
        } catch (error) {
            console.error("Failed to search novels: ", error.message);
        }
    },

    async getBrowseNovels(view, page, size, tags) {
        try {
            if (!(tags ?? false)) {
                throw TypeError("tags param is invalid");
            }
            const tagIds = (tags.length !== 0) && { tagId: tags.join(",") };
            const response = await fetchApi({
                method: 'get',
                url: "/novels/browse",
                params: {
                    pageNumber: page,
                    pageSize: size,
                    sortBy: view,
                    ...tagIds
                }
            })
            return response.data;
        } catch (error) {
            if (error instanceof TypeError) {
                console.error("", error.message)
                return;
            }
            console.error("Failed to browse novels: ", error.message);
        }
    },

    async getRanking(page, size, period) {
        try {
            const response = await fetchApi({
                method: 'get',
                url: `/novels/ranking`,
                params: {
                    pageNumber: page,
                    pageSize: size,
                    period,
                }
            })
            return response.data;
        } catch (error) {
            console.error("Failed to load ranking novels: ", error.response.data);
            handleError(error, 'INACTION')
        }
    }
}

export const tagApi = {
    async getTagsByNovel(id) {

        try {
            const response = await fetchApi({
                method: 'get',
                url: `/novels/${id}/tags`,
            })
            return response.data;
        } catch (error) {
            console.error("Failed to load tag by novel")
            handleError(error, 'INACTION')
        }

    },
    async getTagByName(name) {
        try {
            const response = await fetchApi({
                method: 'get',
                url: `/tags`,
                params: {
                    tagName: name
                }
            })
            return response.data;
        } catch (error) {
            console.error("Failed to load tag by name")
            handleError(error, 'INACTION')
        }
    },

    async searchTag(searchWord) {
        try {
            const response = await fetchApi({
                method: 'get',
                url: `/tags`,
                params: {
                    searchWord
                }
            })
            return response.data;
        } catch (error) {
            console.error("Failed to load tag by name")
            handleError(error, 'INACTION')
            throw error;
        }
    }
}

export const episodeApi = {
    async getEpisode(id) {
        try {
            const response = await fetchApi({
                method: 'get',
                url: `/episodes/${id}`,
            })
            return response.data;
        } catch (error) {
            console.error("Failed to load episode content");
            handleError(error, "LOGIN");
            throw error;
        }
    },

    async getEpisodeBeside(id, direction) {
        try {
            const response = await fetchApi({
                method: 'get',
                url: `/episodes/${id}/beside?direction=${direction}`,
            })
            return response.data;
        } catch (error) {
            console.error("Failed to load next episode content");
            handleError(error, 'INACTION');
            throw error;
        }
    },

    async getEpisodesByNovel(id, sort, page, size) {
        try {
            const response = await fetchApi({
                method: 'get',
                url: `/novels/${id}/episodes`,
                params: {
                    sortBy: sort,
                    pageNumber: page,
                    pageSize: size
                }
            })
            return response.data;
        } catch (error) {
            console.error("Failed to load episodes in novel");
            handleError(error, 'INACTION')
        }
    },
    async getEpisodesInfoByNovel(id) {
        try {
            const response = await fetchApi({
                method: 'get',
                url: `/novels/${id}/episodes/info`
            })
            return response.data;
        } catch (error) {
            console.error("Failed to load episode info");
        }
    },

    async payForEpisode(paymentDto) {
        try {
            const response = await fetchApi({
                method: 'post',
                url: '/coin-use-histories',
                data: paymentDto
            })
            return response.data;
        } catch (error) {
            console.error(`Failed to execute payment`);
            handleError(error, "LOGIN")
            throw error;
        }
    },

    async createEpisode(novelId, createDto) {
        try {
            const response = await fetchApi({
                method: 'post',
                url: `/novels/${novelId}/episodes`,
                data: createDto
            })
            return response.data;
        } catch (error) {
            console.error("Failed to create episode of novel")
            handleError(error, "LOGIN")
        }
    },

    async updateEpisode(updateDto) {
        try {
            const response = await fetchApi({
                method: 'post',
                url: `/episodes/${updateDto.episodeId}`,
                data: updateDto
            })
            return response.data;
        } catch (error) {
            console.error("Failed to update episode")
            handleError(error, "LOGIN")
        }
    },

    async deleteEpisode(episodeId) {
        try {
            const response = await fetchApi({
                method: 'delete',
                url: `/episodes/${episodeId}`,
            })
            return response.data;
        } catch (error) {
            console.error("Failed to delete episode")
            handleError(error, "LOGIN")
        }
    },
}

export const commentApi = {
    async getCommentsByNovel(id, sort, page, size) {
        try {
            const response = await fetchApi({
                method: 'get',
                url: `/novels/${id}/comments`,
                params: {
                    sortBy: sort,
                    pageNumber: page,
                    pageSize: size
                }
            })
            return response.data;
        } catch (error) {
            console.error("Failed to get comments in novel: ");
            handleError(error, 'INACTION')
        }
    },

    async getCommentsByEpisode(id, sort, page, size) {
        try {
            const response = await fetchApi({
                method: 'get',
                url: `/episodes/${id}/comments`,
                params: {
                    sortBy: sort,
                    pageNumber: page,
                    pageSize: size
                }
            })
            return response.data;
        } catch (error) {
            console.error("Failed to get comments in episode: ");
            handleError(error, 'INACTION')
        }
    },

    async createComment(createDto) {
        try {
            const response = await fetchApi({
                method: 'post',
                url: `/comments`,
                data: createDto
            })
            return response.data;
        } catch (error) {
            console.error("Failed to create comment");
            handleError(error, "LOGIN")
            throw error;
        }
    },


    async updateComment(updateDto) {
        try {
            const response = await fetchApi({
                method: 'patch',
                url: `/comments/${updateDto.commentId}`,
                data: updateDto
            })
            return response.data;
        } catch (error) {
            console.error("Failed to update comment");
            handleError(error, "LOGIN")
        }
    },

    async deleteComment(deleteDto) {
        try {
            const response = await fetchApi({
                method: 'delete',
                url: `/comments/${deleteDto.commentId}`,
                data: deleteDto
            })
            return response.data;
        } catch (error) {
            console.error("Failed to delete comment");
            handleError(error, "LOGIN")
        }
    },

    async toggleLike(dto) {
        try {
            const response = await fetchApi({
                method: 'post',
                url: `/comments/${dto.commentId}/comment-likes`,
                data: dto
            })
            return response.data;
        } catch (error) {
            console.error("Failed to toggle comment like");
            handleError(error, "ALERT");
            throw error;
        }
    },


    async createRecomment(createDto) {
        try {
            const response = await fetchApi({
                method: 'post',
                url: `/recomment`,
                data: createDto
            })
            return response.data;
        } catch (error) {
            console.error("Failed to create recomment of the comment");
            handleError(error, "ALERT")
            throw error;
        }
    },

}

export const memberApi = {
    async getMyPageData() {
        try {
            const response = await fetchApi({
                method: 'get',
                url: `/members/me/mypage`,
            })
            return response.data;
        } catch (error) {
            console.error("Failed to load my page info")
            handleError(error, "LOGIN");
        }
    },

    async getWorksSettlement() {
        try {
            const response = await fetchApi({
                method: 'get',
                url: `/settlements`
            })
            return response.data;
        } catch (error) {
            console.error("Failed to load coin use history in works")
            handleError(error);
        }
    },

    async requestSettlement() {
        try {
            const response = await fetchApi({
                method: 'post',
                url: `/settlements`
            })
            return response.data;
        } catch (error) {
            console.error("Failed to request the settlement")
            handleError(error, "LOGIN");
        }
    },

    async getSettlementResult() {
        try {
            const response = await fetchApi({
                method: 'get',
                url: `/settlements`
            })
            return response.data;
        } catch (error) {
            console.error("Failed to get settlement result")
            handleError(error, "LOGIN");
        }
    },

    async getWorks() {
        try {
            const response = await fetchApi({
                method: 'get',
                url: `/members/me/novels`,
            })
            return response.data;
        } catch (error) {
            console.error("Failed to load my works list");
            handleError(error, "LOGIN")
        }
    },

    //읽은 기록 관련 api
    async getRecentReadNovels(page, size) {
        try {
            const response = await fetchApi({
                method: 'get',
                url: `/members/me/recent-read`,
                params: {
                    pageNumber: page,
                    pageSize: size
                }
            })
            return response.data;
        } catch (error) {
            console.error("Failed to load recent reads: ", error.message)
            handleError(error, "LOGIN");
        }
    },

    //선호작 관련 api
    async getCheckFavorite(id) {
        try {
            const response = await fetchApi({ method: 'get', url: `/members/me/favorites/check?novelId=${id}` })
            return response.data;
        } catch (error) {
            handleError(error, 'INACTION');
            throw error;
        }
    },
    async toggleNovelFavorite(id) {
        try {
            const response = await fetchApi({ method: 'post', url: `/members/me/favorites/${id}` })
            return response.data;
        } catch (error) {
            handleError(error, "ALERT");
            throw error;
        }
    },
    async getFavoriteNovels() {
        try {
            const response = await fetchApi({ method: 'get', url: `/members/me/favorites` })
            return response.data;
        } catch (error) {
            handleError(error, "LOGIN");
        }
    },
}