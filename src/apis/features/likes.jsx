import apiClient from "../api-client";

export const toggleArticleLike = (boardId, articleId) => {
    return apiClient.post(`/boards/${boardId}/articles/${articleId}/likes`);
};