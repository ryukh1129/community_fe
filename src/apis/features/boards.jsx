import apiClient from "../api-client";

export const createBoard = (title) => {
    return apiClient.post("/boards", { title });
}

export const getBoards = () => {
    return apiClient.get("/boards");
}