const API_URL = 'http://localhost:8081';

export default {

    async getMyPageData() {
        const reqUrl = `${API_URL}/api/member/mypage`
        const response = await fetch(reqUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('getMyPageData: Network response was not ok');
        }
        return response.json();
    },

    async getCommentsByNovel(novelId, sortBy) {
        const reqUrl = `${API_URL}/api/comments/novel/${sortBy}`
        const response = await fetch(reqUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ novelId: novelId }),
        });
        if (!response.ok) {
            throw new Error('getEpisodesByNovel: Network response was not ok');
        }
        return response.json();
    },

    async getEpisodesByNovel(novelId) {
        const reqUrl = `${API_URL}/api/episode?novelId=${novelId}`
        const response = await fetch(reqUrl);
        if (!response.ok) {
            throw new Error('getEpisodesByNovel: Network response was not ok');
        }
        return response.json();
    },

    async getNovel(novelId) {
        const reqUrl = `${API_URL}/api/novel/${novelId}`
        const response = await fetch(reqUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    },

    async createNovel(novelCreateDto) {
        const response = await fetch(`${API_URL}/api/novel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novelCreateDto),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    },

    async updateNovel(novelUpdateDto) {
        const response = await fetch(`${API_URL}/api/novel/${novelUpdateDto.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novelUpdateDto),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    },

    async deleteNovel(novelDeleteDto) {
        const response = await fetch(`${API_URL}/api/novel/${novelDeleteDto.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novelDeleteDto),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }
};