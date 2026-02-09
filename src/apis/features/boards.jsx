import apiClient from "../api-client";

export const createBoard = (boardData) => {
    return apiClient.post("/boards", boardData);
}

export const getBoards = () => {
    return apiClient.get("/boards");
}