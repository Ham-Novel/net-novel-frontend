import api from "./globalApi";

async function fetchApi({ method, url, params, data, error } = {}) {
    const config = {
        method,
        url,
        data,
        params,
        globalAdvice: error ?? true
    }
    console.debug('[BACKEND_API]', config)
    return await api(config);
}

export const coinApi = {
    async getChargeHistory(pageNumber, pageSize) {
        const response = await fetchApi({
            method: 'get',
            url: '/members/me/coin-charge-history',
            params: {
                pageNumber,
                pageSize
            }
        });
        return response.data;
    },

    async chargeCoins(createDto) {
        const response = await fetchApi({
            method: 'post',
            url: '/coin-charge-history',
            data: createDto
        });
        return response.data;
    },

}

export const novelApi = {
    async getNovel(id) {
        const response = await fetchApi({ method: 'get', url: `/novels/${id}` });
        return response.data;
    },

    async createNovel(createDto) {
        const response = await fetchApi({ method: 'post', url: '/novels', data: createDto })
        return response.data;
    },

    async updateNovel(id, updateDto) {
        const response = await fetchApi({ method: 'put', url: `/novels/${id}`, data: updateDto })
        return response.data;
    },

    async deleteNovel(id, deleteDto) {
        await fetchApi({ method: 'delete', url: `/novels/${id}`, data: deleteDto })
    },

    async uploadNovelThumbnail(id, imgFile) {
        const formData = new FormData();
        formData.append('file', imgFile);
        await fetchApi({ method: 'post', url: `/novels/${id}/thumbnail`, data: formData });

    },

    // async getNovelList(page, size) {
    //     const reqUrl = `${API_URL}/novels?pageNumber=${page}&pageSize=${size}`
    //     const resp = await fetch(reqUrl);
    //     if (!resp.ok) {
    //         throw new Error(BAD_REQUEST_MSG);
    //     }
    //     return await resp.json();
    // },

    async searchNovel(word, type, page, size, error) {
        const response = await fetchApi({
            method: 'get',
            url: "/novels/search",
            params: {
                searchWord: word,
                searchType: type,
                pageNumber: page,
                pageSize: size,
            },
            error
        })
        return response.data;

    },

    async browseNovel(view, page, size, tags) {
        if (!(tags ?? false)) {
            throw TypeError("tags param is invalid");
        }
        const tagIds = (tags.length !== 0) && tags.join(",");
        const response = await fetchApi({
            method: 'get',
            url: "/novels/browse",
            params: {
                pageNumber: page,
                pageSize: size,
                sortBy: view,
                tagIds
            }
        })
        return response.data;
    },

    async getRanking(page, size, period) {
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
    }
}

export const tagApi = {
    async getTagsByNovel(id) {
        const response = await fetchApi({
            method: 'get',
            url: `/novels/${id}/tags`,
        })
        return response.data;
    },

    async getTagById(id) {
        const response = await fetchApi({
            method: 'get',
            url: `/tags/info`,
            params: {
                tagId: id
            }
        })
        return response.data;
    },

    async getTagByName(name) {
        const response = await fetchApi({
            method: 'get',
            url: `/tags/info`,
            params: {
                tagName: name
            }
        })
        return response.data;
    },

    async searchTag(searchWord) {
        const response = await fetchApi({
            method: 'get',
            url: `/tags`,
            params: {
                searchWord
            }
        })
        return response.data;
    }
}

export const episodeApi = {
    async getEpisode(id) {
        const response = await fetchApi({
            method: 'get',
            url: `/episodes/${id}`,
        })
        return response.data;
    },

    async getEpisodeBeside(id, direction) {
        const response = await fetchApi({
            method: 'get',
            url: `/episodes/${id}/beside?direction=${direction}`,
        })
        return response.data;
    },

    async getEpisodesByNovel(id, sort, page, size) {
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
    },
    async getEpisodesInfoByNovel(id) {
        const response = await fetchApi({
            method: 'get',
            url: `/novels/${id}/episodes/info`
        })
        return response.data;
    },

    async payForEpisode(paymentDto) {
        const response = await fetchApi({
            method: 'post',
            url: '/coin-use-histories',
            data: paymentDto
        })
        return response.data;
    },

    async createEpisode(novelId, createDto) {
        const response = await fetchApi({
            method: 'post',
            url: `/novels/${novelId}/episodes`,
            data: createDto
        })
        return response.data;
    },

    async updateEpisode(updateDto) {
        const response = await fetchApi({
            method: 'post',
            url: `/episodes/${updateDto.episodeId}`,
            data: updateDto
        })
        return response.data;
    },

    async deleteEpisode(episodeId) {
        const response = await fetchApi({
            method: 'delete',
            url: `/episodes/${episodeId}`,
        })
        return response.data;
    },
}

export const commentApi = {
    async getCommentsByNovel(id, sort, page, size) {
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
    },

    async getCommentsByEpisode(id, sort, page, size) {
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
    },

    async createComment(createDto) {
        const response = await fetchApi({
            method: 'post',
            url: `/comments`,
            data: createDto
        })
        return response.data;
    },

    async updateComment(updateDto) {
        const response = await fetchApi({
            method: 'patch',
            url: `/comments/${updateDto.commentId}`,
            data: updateDto
        })
        return response.data;
    },

    async deleteComment(deleteDto) {
        const response = await fetchApi({
            method: 'delete',
            url: `/comments/${deleteDto.commentId}`,
            data: deleteDto
        })
        return response.data;
    },

    async toggleLike(dto, error) {
        const response = await fetchApi({
            method: 'post',
            url: `/comments/${dto.commentId}/comment-likes`,
            data: dto,
            error
        })
        return response.data;
    },

    async toggleLikeRecomment(dto, error) {
        console.log(error);
        const response = await fetchApi({
            method: 'post',
            url: `/re-comment-likes`,
            data: dto,
            error
        })
        return response.data;
    },


    async createRecomment(createDto) {
        const response = await fetchApi({
            method: 'post',
            url: `/recomment`,
            data: createDto
        })
        return response.data;
    },
    async updateRecomment(updateDto) {
        const response = await fetchApi({
            method: 'patch',
            url: `/recomment`,
            data: updateDto
        })
        return response.data;
    },

    async deleteRecomment(deleteDto) {
        const response = await fetchApi({
            method: 'delete',
            url: `/recomment`,
            data: deleteDto
        })
        return response.data;
    },
}

//선호작 api
export const favoriteApi = {
    async checkFavorite(id) {
        const response = await fetchApi({ method: 'get', url: `/members/me/favorites/check?novelId=${id}` })
        if (response.data === "로그인 정보 없음") {
            throw Error(response.data);
        }
        return response.data;
    },
    async toggleFavorite(id) {
        const response = await fetchApi({ method: 'post', url: `/members/me/favorites/${id}` })
        return response.data;
    },
    async getFavorites() {
        const response = await fetchApi({ method: 'get', url: `/members/me/favorites` })
        return response.data;
    },
}

export const memberApi = {
    async getMyPageData() {
        const response = await fetchApi({
            method: 'get',
            url: `/members/me/mypage`,
        })
        return response.data;
    },

    async getWorksSettlement() {
        const response = await fetchApi({
            method: 'get',
            url: `/settlements`
        })
        return response.data;
    },

    async requestSettlement() {
        const response = await fetchApi({
            method: 'post',
            url: `/settlements`
        })
        return response.data;
    },

    async getSettlementResult() {
        const response = await fetchApi({
            method: 'get',
            url: `/settlements`
        })
        return response.data;
    },

    async getWorks() {
        const response = await fetchApi({
            method: 'get',
            url: `/members/me/novels`,
        })
        return response.data;
    },

    //읽은 기록 관련 api
    async getRecentReadNovels(page, size) {
        const response = await fetchApi({
            method: 'get',
            url: `/members/me/recent-read`,
            params: {
                pageNumber: page,
                pageSize: size
            }
        })
        return response.data;
    },

    async getCommentsByMember(page, size) {
        const response = await fetchApi({
            method: 'get',
            url: `/members/me/comments`,
            params: {
                pageNumber: page,
                pageSize: size
            }
        })
        return response.data;
    },
}