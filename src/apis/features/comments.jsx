import apiClient from "../api-client";

export const createComment = (boardId, articleId, commentData) => {
    return apiClient.post(`/boards/${boardId}/articles/${articleId}/comments`, commentData);
}