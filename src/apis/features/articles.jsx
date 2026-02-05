import apiClient from '../api-client';

export const getArticlesByBoard = (boardId, page = 0) => {
    return apiClient.get(`/boards/${boardId}/articles?page=${page}&size=10`);
};

export const getArticleDetail = (boardId, articleId) => {
    return apiClient.get(`/boards/${boardId}/articles/${articleId}`);
};

export const createArticle = (boardId, articleData) => {
    const formData = new FormData();
    const jsonData = { title: articleData.title, content: articleData.content };
    formData.append('articleData', new Blob([JSON.stringify(jsonData)], { type: 'application/json' }));
    
    if (articleData.file) {
        formData.append('file', articleData.file);
    }

    return apiClient.post(`/boards/${boardId}/articles`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};