import apiClient from "../api-client";

export const toggleArticleLike = (boardId, articleId) => {
    return apiClient.post(`/boards/${boardId}/articles/${articleId}/likes`);
};

export const toggleCommentLike = (boardId, articleId, commentId) => {
    return apiClient.post(`/boards/${boardId}/articles/${articleId}/comments/${commentId}/likes`);
};