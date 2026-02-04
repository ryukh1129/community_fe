import apiClient from "../api-client";

export const createBoard = (userData) => {
    return apiClient.post("/boards", userData);
}

export const getBoards = () => {
    return apiClient.get("/boards");
}